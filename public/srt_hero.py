import json
import os
import re
from datetime import datetime, timedelta

# Configuration to match TypeScript/TSX settings from config.ts
JSON_FOLDER = "data"
SRT_FOLDER = "srt_output"

# Video settings matching config.ts
FPS = 60
WIDTH = 2560
HEIGHT = 1440

# Timing settings matching config.ts
INTRO_DELAY_FRAMES = 120  # Delay intro dalam frame (2 detik)
ENDING_DURATION = 5       # Durasi ending dalam detik
DURASI_PER_CARD_DETIK = 6 # Durasi per kartu dalam detik

# Convert frame delays to seconds
INTRO_DELAY_SECONDS = INTRO_DELAY_FRAMES / FPS  # 2 seconds

os.makedirs(SRT_FOLDER, exist_ok=True)

def validate_and_sort_players(raw_players):
    """
    Validates player data and sorts by date_of_join (oldest first).
    Returns validated and sorted player list matching TypeScript logic.
    """
    def validate_player(player):
        """Ensure player has required fields with defaults if missing."""
        # Handle different field names and clean data
        name = clean_text(player.get("name", "Unknown"))
        full_name = clean_text(player.get("full_name", "Unknown"))
        nation = clean_text(player.get("nation", "Unknown"))
        date_of_join = player.get("date_of_join", "1900-01-01")
        team = clean_text(player.get("team", "Unknown Team"))
        roles = player.get("roles", [])
        
        # Clean roles array
        if isinstance(roles, list):
            roles = [clean_text(role) for role in roles if role and clean_text(role) != "no data"]
        else:
            roles = [clean_text(roles)] if roles and clean_text(roles) != "no data" else []
        
        
        return {
            "name": name,
            "full_name": full_name,
            "nation": nation,
            "date_of_join": date_of_join,
            "team": team,
            "roles": roles
        }

    # Validate each player and filter out invalid ones
    validated_players = []
    for player in raw_players:
        if isinstance(player, dict) and player.get("name") and player.get("name") != "no data":
            validated_player = validate_player(player)
            if validated_player["name"] != "Unknown" and validated_player["name"] != "no data":
                validated_players.append(validated_player)
    
    # Sort by date_of_join (oldest first) - matching TypeScript logic
    validated_players.sort(
        key=lambda x: parse_date(x["date_of_join"])
    )
    validated_players.reverse()  # Reverse to get oldest first
    
    return validated_players

def format_time(seconds):
    td = timedelta(seconds=round(seconds, 3))
    total_seconds = int(td.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    milliseconds = int(td.microseconds / 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02},{milliseconds:03}"

def clean_text(text):
    if not isinstance(text, str):
        return str(text)
    # Remove extra whitespace and normalize quotes
    text = re.sub(r"\s+", " ", text)
    text = text.replace("'", "'").replace(""", '"').replace(""", '"')
    # Remove "no data" and similar placeholder text
    text = text.replace("no data", "").strip()
    return text.strip()

def parse_date(date_str):
    if not isinstance(date_str, str):
        return datetime(1900, 1, 1)
    
    # Handle various date formats
    date_formats = [
        "%Y-%m-%d",
        "%d.%m.%Y", 
        "%d/%m/%Y",
        "%Y/%m/%d"
    ]
    
    for fmt in date_formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    
    # If no format matches, return default date
    return datetime(1900, 1, 1)

def calculate_total_duration(cards_to_show):
    """Calculate total duration matching config.ts getTotalDuration() function"""
    return FPS * DURASI_PER_CARD_DETIK * cards_to_show

def calculate_total_video_duration(cards_to_show):
    """Calculate total video duration matching config.ts getTotalVideoDuration() function"""
    total_duration = calculate_total_duration(cards_to_show)
    ending_duration_frames = ENDING_DURATION * FPS
    return INTRO_DELAY_FRAMES + total_duration + ending_duration_frames

def get_duration_in_seconds(frames):
    """Convert frames to seconds matching config.ts getDurationInSeconds() function"""
    return frames / FPS

def generate_srt_flexible(json_file):
    """
    Generate SRT with configuration matching config.ts.
    Automatically reads total cards from JSON file.
    """
    try:
        with open(json_file, "r", encoding="utf-8") as f:
            raw_players = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError) as e:
        print(f"❌ ERROR: Failed to load {json_file}: {e}")
        return

    if not raw_players:
        print(f"⚠ WARNING: No players found in {json_file}")
        return

    # Use validation and sorting function matching TypeScript logic
    players = validate_and_sort_players(raw_players)
    
    if not players:
        print(f"⚠ WARNING: No valid players found in {json_file}")
        return
    
    # Automatically read total cards from JSON (matching config.ts cardsToShow logic)
    cards_to_show = len(players)
    team_name = players[0]["team"] if players else "Unknown Team"
    srt_filename = os.path.join(SRT_FOLDER, os.path.basename(json_file).replace(".json", "_flexible.srt"))

    # Calculate durations matching config.ts functions
    total_duration_frames = calculate_total_duration(cards_to_show)
    total_video_duration_frames = calculate_total_video_duration(cards_to_show)
    total_duration_seconds = get_duration_in_seconds(total_duration_frames)
    total_video_duration_seconds = get_duration_in_seconds(total_video_duration_frames)

    print(f"📊 Processing {json_file} (config.ts settings):")
    print(f"   - Total players in JSON: {len(raw_players)}")
    print(f"   - Valid players: {len(players)}")
    print(f"   - Cards to show: {cards_to_show} (auto-read from JSON)")
    print(f"   - Duration per card: {DURASI_PER_CARD_DETIK} seconds (from config.ts)")
    print(f"   - Intro delay: {INTRO_DELAY_SECONDS} seconds (from config.ts)")
    print(f"   - Total content duration: {total_duration_seconds:.1f} seconds")
    print(f"   - Total video duration: {total_video_duration_seconds:.1f} seconds")

    with open(srt_filename, "w", encoding="utf-8") as srt_file:
        index = 1
        
        # Opening title - using INTRO_DELAY_SECONDS from config.ts
        srt_file.write(
            f"{index}\n"
            f"00:00:00,000 --> {format_time(INTRO_DELAY_SECONDS)}\n"
            f"Riwayat Pemain {team_name} 2017-2025\n\n"
        )
        index += 1

        # Player entries - show all players from JSON
        for i, player in enumerate(players):
            start_seconds = INTRO_DELAY_SECONDS + i * DURASI_PER_CARD_DETIK
            end_seconds = INTRO_DELAY_SECONDS + (i + 1) * DURASI_PER_CARD_DETIK

            if end_seconds <= start_seconds:
                print(f"⚠ WARNING: Invalid duration at entry {index}")
                continue

            # Format roles string
            roles = player.get("roles", [])
            if isinstance(roles, list) and roles:
                roles_str = ", ".join(clean_text(r) for r in roles if r and clean_text(r))
            else:
                roles_str = "Tidak diketahui"
            
            # Clean up the date display
            join_date = player.get("date_of_join", "")
            if join_date and join_date != "1900-01-01" and join_date != "no data":
                # Try to format the date nicely
                try:
                    parsed_date = parse_date(join_date)
                    if parsed_date.year > 1900:
                        formatted_date = parsed_date.strftime("%d %B %Y")
                    else:
                        formatted_date = join_date
                except:
                    formatted_date = join_date
            else:
                formatted_date = "Tidak diketahui"
            
            # Write subtitle entry
            srt_file.write(
                f"{index}\n"
                f"{format_time(start_seconds)} --> {format_time(end_seconds)}\n"
                f"{player['name']} ({player['nation']})\n"
                f"Nama: {player['full_name']} | Tanggal masuk {team_name}: {formatted_date} | Roles: [{roles_str}]\n\n"
            )
            index += 1

        # Ending subtitle - using ENDING_DURATION from config.ts
        ending_start = INTRO_DELAY_SECONDS + cards_to_show * DURASI_PER_CARD_DETIK
        ending_end = ending_start + ENDING_DURATION
        srt_file.write(
            f"{index}\n"
            f"{format_time(ending_start)} --> {format_time(ending_end)}\n"
            f"Terima kasih sudah menonton!\n\n"
        )

    print(f"✅ Generated: {srt_filename} with {cards_to_show} players")
    print(f"   - Content duration: {total_duration_seconds:.1f} seconds")
    print(f"   - Total video duration: {total_video_duration_seconds:.1f} seconds")
    return srt_filename

# Process all JSON files with config.ts settings
def main():
    print("🚀 Starting SRT generation with config.ts settings...")
    print(f"📋 Configuration:")
    print(f"   - FPS: {FPS}")
    print(f"   - Duration per card: {DURASI_PER_CARD_DETIK} seconds")
    print(f"   - Intro delay: {INTRO_DELAY_SECONDS} seconds")
    print(f"   - Ending duration: {ENDING_DURATION} seconds")
    print(f"   - Cards: Auto-read from JSON files")
    
    json_files = [f for f in os.listdir(JSON_FOLDER) if f.endswith(".json")]
    print(f"\n📁 Found {len(json_files)} JSON files to process")
    
    for file in json_files:
        print(f"\n{'='*50}")
        json_path = os.path.join(JSON_FOLDER, file)
        generate_srt_flexible(json_path)
    
    print(f"\n{'='*50}")
    print(f"🎉 SRT generation completed with config.ts settings!")

if __name__ == "__main__":
    main() 
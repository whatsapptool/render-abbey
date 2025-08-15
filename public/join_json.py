import json

# Daftar file JSON yang ingin digabung
input_files = [
    "data/mlbb_exp_laner.json", 
    "data/mlbb_gold_laner.json", 
    "data/mlbb_jungle.json", 
    "data/mlbb_mid_laner.json", 
    "data/mlbb_roam.json", 
]  # Tambahkan file lain di sini

output_file = "gabungan.json"

# List untuk menampung semua data
combined_data = []

# Membaca setiap file dan menambahkannya ke combined_data
for filename in input_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                combined_data.extend(data)
            else:
                print(f"Peringatan: Isi {filename} bukan list, dilewati.")
    except Exception as e:
        print(f"Gagal membaca {filename}: {e}")

# Menyimpan hasil gabungan ke file baru
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, indent=2)

print(f"\nGabungan selesai! Data tersimpan di '{output_file}'")
print(f"Jumlah total entri: {len(combined_data)}")
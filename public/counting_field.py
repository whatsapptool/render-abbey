import os
import json

def hitung_field_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            # Hitung jumlah field level pertama
            return len(data)
    except Exception as e:
        print(f"Error membaca {file_path}: {e}")
        return None

def scan_folder(folder_path):
    hasil = []
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                jumlah_field = hitung_field_json(file_path)
                if jumlah_field is not None:
                    rel_path = os.path.relpath(file_path, start=os.getcwd())
                    hasil.append(f"{rel_path}: {jumlah_field} field")
    return hasil

def simpan_hasil(hasil, output_file='counting_field.txt'):
    with open(output_file, 'w', encoding='utf-8') as f:
        for baris in hasil:
            f.write(baris + '\n')

def main():
    folder_list = ['data', 'gaming', 'folder_3']

    semua_hasil = []

    for folder in folder_list:
        if os.path.exists(folder):
            print(f"Memindai {folder}...")
            hasil = scan_folder(folder)
            semua_hasil.extend(hasil)
        else:
            print(f"Folder {folder} tidak ditemukan.")

    if semua_hasil:
        simpan_hasil(semua_hasil)
        print(f"\n✅ Hasil telah disimpan ke 'counting_field.txt'")
    else:
        print("Tidak ada file JSON yang ditemukan atau terjadi kesalahan.")

if __name__ == '__main__':
    main()
export type Surah = {
  name: string
  number: number
}

export const Suwar: Surah[] = [
  { name: 'Al-Fatiha', number: 1 },
  { name: 'Al-Baqarah', number: 2 },
  { name: "Ali 'Imran", number: 3 },
  { name: 'An-Nisa', number: 4 },
  { name: "Al-Ma'idah", number: 5 },
  { name: "Al-An'am", number: 6 },
  { name: "Al-A'raf", number: 7 },
  { name: 'Al-Anfal', number: 8 },
  { name: 'At-Tawbah', number: 9 },
  { name: 'Yunus', number: 10 },
  { name: 'Hud', number: 11 },
  { name: 'Yusuf', number: 12 },
  { name: "Ar-Ra'd", number: 13 },
  { name: 'Ibrahim', number: 14 },
  { name: 'Al-Hijr', number: 15 },
  { name: 'An-Nahl', number: 16 },
  { name: 'Al-Isra', number: 17 },
  { name: 'Al-Kahf', number: 18 },
  { name: 'Maryam', number: 19 },
  { name: 'Ta-ha', number: 20 },
  { name: 'Al-Anbya', number: 21 },
  { name: 'Al-Hajj', number: 22 },
  { name: "Al-Mu'minun", number: 23 },
  { name: 'An-Nur', number: 24 },
  { name: 'Al-Furqan', number: 25 },
  { name: "Ash-Shu'ara", number: 26 },
  { name: 'An-Naml', number: 27 },
  { name: 'Al-Qasas', number: 28 },
  { name: "Al-'Ankabut", number: 29 },
  { name: 'Ar-Rum', number: 30 },
  { name: 'Luqman', number: 31 },
  { name: 'As-Sajdah', number: 32 },
  { name: 'Al-Ahzab', number: 33 },
  { name: 'Saba', number: 34 },
  { name: 'Fatir', number: 35 },
  { name: 'Ya-Sin', number: 36 },
  { name: 'As-Saffat', number: 37 },
  { name: 'Saad', number: 38 },
  { name: 'Az-Zumar', number: 39 },
  { name: 'Ghafir', number: 40 },
  { name: 'Fussilat', number: 41 },
  { name: 'Ash-Shuraa', number: 42 },
  { name: 'Az-Zukhruf', number: 43 },
  { name: 'Ad-Dukhan', number: 44 },
  { name: 'Al-Jathiyah', number: 45 },
  { name: 'Al-Ahqaf', number: 46 },
  { name: 'Muhammad', number: 47 },
  { name: 'Al-Fath', number: 48 },
  { name: 'Al-Hujurat', number: 49 },
  { name: 'Qaf', number: 50 },
  { name: 'Adh-Dhariyat', number: 51 },
  { name: 'At-Tur', number: 52 },
  { name: 'An-Najm', number: 53 },
  { name: 'Al-Qamar', number: 54 },
  { name: 'Ar-Rahman', number: 55 },
  { name: "Al-Waqi'ah", number: 56 },
  { name: 'Al-Hadid', number: 57 },
  { name: 'Al-Mujadila', number: 58 },
  { name: 'Al-Hashr', number: 59 },
  { name: 'Al-Mumtahanah', number: 60 },
  { name: 'As-Saf', number: 61 },
  { name: "Al-Jumu'ah", number: 62 },
  { name: 'Al-Munafiqun', number: 63 },
  { name: 'At-Taghabun', number: 64 },
  { name: 'At-Talaq', number: 65 },
  { name: 'At-Tahrim', number: 66 },
  { name: 'Al-Mulk', number: 67 },
  { name: 'Al-Qalam', number: 68 },
  { name: 'Al-Haqqah', number: 69 },
  { name: "Al-Ma'arij", number: 70 },
  { name: 'Nuh', number: 71 },
  { name: 'Al-Jinn', number: 72 },
  { name: 'Al-Muzzammil', number: 73 },
  { name: 'Al-Muddaththir', number: 74 },
  { name: 'Al-Qiyamah', number: 75 },
  { name: 'Al-Insan', number: 76 },
  { name: 'Al-Mursalat', number: 77 },
  { name: 'An-Naba', number: 78 },
  { name: "An-Nazi'at", number: 79 },
  { name: "'Abasa", number: 80 },
  { name: 'At-Takwir', number: 81 },
  { name: 'Al-Infitar', number: 82 },
  { name: 'Al-Mutaffifin', number: 83 },
  { name: 'Al-Inshiqaq', number: 84 },
  { name: 'Al-Buruj', number: 85 },
  { name: 'At-Tariq', number: 86 },
  { name: "Al-A'la", number: 87 },
  { name: 'Al-Ghashiyah', number: 88 },
  { name: 'Al-Fajr', number: 89 },
  { name: 'Al-Balad', number: 90 },
  { name: 'Ash-Shams', number: 91 },
  { name: 'Al-Layl', number: 92 },
  { name: 'Ad-Duhaa', number: 93 },
  { name: 'Ash-Sharh', number: 94 },
  { name: 'At-Tin', number: 95 },
  { name: "Al-'Alaq", number: 96 },
  { name: 'Al-Qadr', number: 97 },
  { name: 'Al-Bayyinah', number: 98 },
  { name: 'Az-Zalzalah', number: 99 },
  { name: "Al-'Adiyat", number: 100 },
  { name: "Al-Qari'ah", number: 101 },
  { name: 'At-Takathur', number: 102 },
  { name: "Al-'Asr", number: 103 },
  { name: 'Al-Humazah', number: 104 },
  { name: 'Al-Fil', number: 105 },
  { name: 'Quraysh', number: 106 },
  { name: "Al-Ma'un", number: 107 },
  { name: 'Al-Kawthar', number: 108 },
  { name: 'Al-Kafirun', number: 109 },
  { name: 'An-Nasr', number: 110 },
  { name: 'Al-Masad', number: 111 },
  { name: 'Al-Ikhlas', number: 112 },
  { name: 'Al-Falaq', number: 113 },
  { name: 'An-Nas', number: 114 },
]
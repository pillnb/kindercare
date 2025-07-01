import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.materialProgress.deleteMany();
  await prisma.webinarRegistration.deleteMany();
  await prisma.dailyProgress.deleteMany();
  await prisma.child.deleteMany();
  await prisma.user.deleteMany();
  await prisma.material.deleteMany();
  await prisma.tip.deleteMany();
  await prisma.webinar.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.doctor.deleteMany();

  // Seed Doctors
  await prisma.doctor.createMany({
    data: [
      {
        id: 1,
        full_name: "Prilly Latuconsina, S. Psi.",
        profession: "psikolog",
        is_active: true,
      }
    ]
  });

  // Seed Materials
  await prisma.material.createMany({
    data: [
      {
        id: 1,
        title: "Kenali Bagian Tubuhmu",
        description: "Mengenalkan bagian-bagian tubuh kepada anak.",
        recommended_age_range: "4-5",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "keselamatan_pribadi"
      },
      {
        id: 2,
        title: "Tubuhku adalah Milikku",
        description: "Mengajarkan bahwa tubuh anak milik mereka sendiri.",
        recommended_age_range: "4-5",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "keselamatan_pribadi"
      },
      {
        id: 3,
        title: "Perbedaan Anak Laki-laki dan Perempuan",
        description: "Penjelasan dasar tentang perbedaan jenis kelamin.",
        recommended_age_range: "4-5",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "pubertas"
      },
      {
        id: 4,
        title: "Aturan Sentuhan Aman",
        description: "Mengenalkan zona aman dan tak aman.",
        recommended_age_range: "6-7",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "keselamatan_pribadi"
      },
      {
        id: 5,
        title: "Siapa yang Bisa Dipercaya?",
        description: "Mengajarkan cara memilih orang dewasa yang dipercaya.",
        recommended_age_range: "6-7",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "hubungan_sosial"
      },
      {
        id: 6,
        title: "Rahasia Baik vs Rahasia Buruk",
        description: "Bedakan rahasia yang aman & yang berbahaya.",
        recommended_age_range: "6-7",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "keselamatan_pribadi"
      },
      {
        id: 7,
        title: "Tubuhku Mulai Berubah",
        description: "Pengantar tentang masa pubertas.",
        recommended_age_range: "8+",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "pubertas"
      },
      {
        id: 8,
        title: "Perasaan yang Berbeda",
        description: "Mengenalkan emosi baru saat bertumbuh.",
        recommended_age_range: "8+",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "emosi"
      },
      {
        id: 9,
        title: "Teman yang baik dan aman di internet",
        description: "Edukasi berteman aman secara online.",
        recommended_age_range: "8+",
        estimated_duration_minutes: null,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: null,
        content: null,
        category: "digital"
      }
    ]
  });

  // Seed Tips
  await prisma.tip.createMany({
    data: [
      {
        id: 5,
        title: "Ketika Anak Bertanya \"Mengapa Perempuan Bisa Hamil?\"",
        content: "Sangat alami anak-anak ingin tahu tentang \"mengapa laki-laki berbeda dengan perempuan?\" atau \"mengapa perempuan bisa hamil?\" Ketika anak mulai bertanya tentang hal tersebut, Anda sebagai orangtua harus siap menjawabnya sebagai bagian dari pendidikan seks untuk anak.\n\nTerkadang, anak dan temannya juga suka tertawa geli saat melihat \"area privat\" satu sama lain atau berbagi candaan \"jorok\". Mengutip Healthy Children, itu juga bagian dari rasa penasaran alamiah dari anak tentang seksualitas.",
        category: "Komunikasi Lanjutan",
        image_url: "/image/tips/when-child-asks-about-pregnancy.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      },
      {
        id: 6,
        title: "Mengenalkan Istilah-Istilah pada Alat Kelamin",
        content: "Gunakan nama-nama yang benar untuk organ seksual (penis, vagina) sejak dini. Ini membantu menghilangkan tabu dan memudahkan anak untuk berbicara secara terbuka jika mereka mengalami sesuatu yang tidak nyaman. Hindari menggunakan nama samaran yang dapat membingungkan.",
        category: "Perkenalan",
        image_url: "/image/tips/introducing-terms-for-genitals.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      },
      {
        id: 7,
        title: "Cerita Tentang Sentuhan Aman dan Tidak Aman",
        content: "Gunakan cerita atau boneka untuk menjelaskan konsep sentuhan yang baik (pelukan dari orang tua) dan sentuhan yang buruk (sentuhan di area pribadi oleh orang lain). Ini membantu anak memahami batasan tanpa merasa takut.",
        category: "Cerita",
        image_url: "/image/tips/safe-and-unsafe-touch.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      },
      {
        id: 8,
        title: "Cara Menjelaskan Perbedaan Tubuh Laki-laki dan Perempuan",
        content: "Jelaskan dengan sederhana dan faktual. Anda bisa mengatakan, \"Tubuh laki-laki dan perempuan berbeda agar nanti saat dewasa bisa menjadi ayah dan ibu.\" Fokus pada fungsi biologis secara umum tanpa detail yang rumit untuk anak usia dini.",
        category: "Perkenalan",
        image_url: "/image/tips/explaining-body-differences.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      }
    ]
  });

  // Seed Webinars
  await prisma.webinar.createMany({
    data: [
      {
        id: 1,
        title: "Webinar Pentingnya Edukasi Seksual",
        speaker: "Prilly Latuconsina, S. Psi.",
        date: new Date("2025-08-01T09:00:00.000Z"),
        description: "Banyaknya kasus kekerasan seksual pada anak...",
        created_at: new Date("2025-06-27T20:13:52.077Z"),
        lokasi: "Online via Zoom",
        job_speaker: "Psikolog Anak"
      }
    ]
  });

  // Seed FAQs
  await prisma.faq.createMany({
    data: [
      {
        id: 9,
        question: "Hal apa saja yang perlu disampaikan saat memberikan pendidikan seksual pada anak?",
        answer: "Poin-poin penting yang perlu disampaikan adalah:\n1. Pengenalan nama-nama bagian tubuh dengan benar.\n2. Konsep \"sentuhan baik\" dan \"sentuhan buruk\".\n3. Batasan tubuh pribadi (area yang tidak boleh disentuh orang lain).\n4. Siapa saja orang dewasa yang bisa dipercaya untuk melapor jika ada sentuhan tidak nyaman.",
        category: "Informasi umum",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 10,
        question: "Di umur keberapa anak harus diajarkan pendidikan seks?",
        answer: "Pendidikan ini bisa dimulai sedini mungkin, bahkan sejak usia 2-3 tahun, dengan bahasa yang disesuaikan tingkat pemahaman anak. Semakin dini, semakin baik untuk membangun fondasi kesadaran tubuh.",
        category: "Informasi umum",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 11,
        question: "Apakah normal jika anak kecil menyentuh area pribadinya?",
        answer: "Ya, ini adalah bagian normal dari eksplorasi tubuh anak. Selama dilakukan di tempat pribadi dan tidak berlebihan, ini adalah perilaku wajar. Orang tua bisa mengajarkan tentang batasan dan privasi dengan cara yang positif.",
        category: "Informasi umum",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 12,
        question: "Bagaimana cara memulai percakapan tentang pubertas dengan anak?",
        answer: "Mulailah secara santai dan bertahap. Gunakan buku atau video sebagai pemicu percakapan. Normalisasikan perubahan yang akan terjadi dan pastikan anak tahu bahwa mereka bisa bertanya apa saja kepada Anda.",
        category: "Komunikasi",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 13,
        question: "Bagaimana cara mengajarkan pendidikan seks sejak dini kepada anak? Supaya tidak terjadi kekerasan seksual pada anak?",
        answer: "Gunakan buku cerita bergambar, lagu, atau permainan peran. Hindari menakut-nakuti. Fokus pada pemberdayaan anak untuk berani berkata \"tidak\" pada sentuhan yang membuat mereka tidak nyaman dan segera memberitahu orang tua.",
        category: "Komunikasi",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 14,
        question: "Pendidikan seks kepada anak itu penting, tapi orangtua sering kesulitan. Bagaimana mengajarakan pendidikan seksual kepada anak dengan cara yang kreatif?",
        answer: "Anda bisa menggunakan media seperti video animasi edukatif yang ramah anak, membuat poster bersama tentang bagian tubuh, atau menggunakan boneka untuk mensimulasikan situasi sosial yang aman dan tidak aman.",
        category: "Komunikasi",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 15,
        question: "Bagaimana cara melindungi anak dari konten negatif di internet?",
        answer: "Gunakan fitur \"safe search\" pada browser, aktifkan mode terbatas di YouTube, dan gunakan aplikasi kontrol orang tua. Yang terpenting adalah membangun komunikasi terbuka agar anak berani melapor jika menemukan sesuatu yang tidak nyaman.",
        category: "Keamanan Digital",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 16,
        question: "Apa itu \"grooming\" online dan bagaimana cara mencegahnya?",
        answer: "Grooming adalah ketika orang dewasa membangun hubungan emosional dengan anak secara online untuk tujuan eksploitasi. Ajarkan anak untuk tidak pernah membagikan informasi pribadi, tidak menerima permintaan pertemanan dari orang asing, dan tidak pernah setuju untuk bertemu dengan orang yang hanya dikenal secara online.",
        category: "Keamanan Digital",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      }
    ]
  });

  // Seed Users dengan personalization_result yang sesuai
  const users = [
    {
      id: 1,
      full_name: "bunda1",
      email: "bunda1@gmail.com",
      phone: "081234567890",
      password: await bcrypt.hash("password123", 10),
      profession: "pns",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-28T12:20:52.785Z"),
      role: "user" as const,
      daily_target_minutes: 15,
      age_range: "20-26",
      learning_preferences: ["digital", "hubungan_sosial", "emosi"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Teman yang baik dan aman di internet" // Sesuai kategori digital
    },
    {
      id: 2,
      full_name: "Darrell Valentino Developer",
      email: "5026nihbos@gmail.com",
      phone: "082121012323",
      password: await bcrypt.hash("password123", 10),
      profession: "Profesor Luar Angkasa",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-27T20:13:51.562Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      personalization_completed: false
    },
    {
      id: 3,
      full_name: "Super Admin",
      email: "admin@kindercare.com",
      phone: "081234567890",
      password: await bcrypt.hash("admin123", 10),
      profession: "Admin Nih B055",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-27T20:13:51.562Z"),
      role: "admin" as const,
      daily_target_minutes: 60,
      personalization_completed: true
    },
    {
      id: 6,
      full_name: "salwa",
      email: "salwa@gmail.com", 
      phone: "082326130006",
      password: await bcrypt.hash("password123", 10),
      profession: "Pegawai Swasta",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-28T10:59:42.276Z"),
      role: "user" as const,
      daily_target_minutes: 30,
      age_range: "20-26",
      learning_preferences: ["keselamatan_pribadi", "pubertas", "hubungan_sosial"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Kenali Bagian Tubuhmu" // Sesuai kategori keselamatan_pribadi
    },
    {
      id: 11,
      full_name: "Vaskya Nabiladasdas",
      email: "pillnb1@gmail.com",
      phone: "97312837198371",
      password: await bcrypt.hash("password123", 10),
      profession: "anosdjasd",
      created_at: new Date("2025-06-27T20:43:58.933Z"),
      updated_at: new Date("2025-06-27T20:44:16.070Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      age_range: "20-26",
      learning_preferences: ["keselamatan_pribadi", "pubertas"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Kenali Bagian Tubuhmu" // Sesuai kategori keselamatan_pribadi
    },
    {
      id: 12,
      full_name: "darrell",
      email: "darrell@gmail.com",
      phone: "0231231723612",
      password: await bcrypt.hash("password123", 10),
      profession: "dasdada",
      created_at: new Date("2025-06-27T20:48:26.036Z"),
      updated_at: new Date("2025-06-27T20:48:52.058Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      age_range: "20-26",
      learning_preferences: ["pubertas", "keselamatan_pribadi"],
      family_value_orientation: "konservatif" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Perbedaan Anak Laki-laki dan Perempuan" // Sesuai kategori pubertas
    },
    {
      id: 16,
      full_name: "bibi",
      email: "bibi@gmail.com",
      phone: "081234567891",
      password: await bcrypt.hash("password123", 10),
      profession: "guru",
      created_at: new Date("2025-06-28T12:03:34.032Z"),
      updated_at: new Date("2025-06-28T12:18:41.588Z"),
      role: "user" as const,
      daily_target_minutes: 15,
      age_range: "27-32",
      learning_preferences: ["keselamatan_pribadi", "pubertas", "hubungan_sosial"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: true,
      personalization_completed: true,
      personalization_result: "Kenali Bagian Tubuhmu" // Sesuai kategori keselamatan_pribadi
    },
    {
      id: 19,
      full_name: "kola",
      email: "kola@gmail.com",
      phone: "1234567890",
      password: await bcrypt.hash("password123", 10),
      profession: "dokter",
      created_at: new Date("2025-06-28T12:23:49.772Z"),
      updated_at: new Date("2025-06-28T12:33:03.441Z"),
      role: "user" as const,
      daily_target_minutes: 15,
      age_range: "20-26",
      learning_preferences: ["emosi", "hubungan_sosial", "keselamatan_pribadi"],
      family_value_orientation: "moderat" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Perasaan yang Berbeda" // Sesuai kategori emosi
    },
    {
      id: 21,
      full_name: "mommy",
      email: "mommy@gmail.com",
      phone: "000000000000000",
      password: await bcrypt.hash("password123", 10),
      profession: "mommy",
      created_at: new Date("2025-06-30T06:36:06.768Z"),
      updated_at: new Date("2025-06-30T06:36:06.768Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      personalization_completed: false
    }
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // Seed Children
  const children = [
    {
      id: 1,
      user_id: 1,
      full_name: "Ani",
      gender: "male" as const,
      birth_date: new Date("2018-05-01T00:00:00.000Z"),
      age: 8,
      education_level: "TK B",
      has_special_needs: false
    },
    {
      id: 11,
      user_id: 6,
      full_name: "Anak Pengguna",
      gender: "male" as const,
      birth_date: new Date("2025-06-28T10:32:15.792Z"),
      age: 4,
      has_special_needs: false
    },
    {
      id: 7,
      user_id: 11,
      full_name: "Anak Pengguna",
      gender: "female" as const,
      birth_date: new Date("2025-06-27T20:44:16.026Z"),
      age: 6,
      has_special_needs: false
    },
    {
      id: 8,
      user_id: 12,
      full_name: "Anak Pengguna",
      gender: "female" as const,
      birth_date: new Date("2025-06-27T20:48:51.985Z"),
      age: 8,
      has_special_needs: false
    },
    {
      id: 14,
      user_id: 16,
      full_name: "A",
      gender: "female" as const,
      birth_date: new Date("2020-06-27T00:00:00.000Z"),
      age: 4,
      education_level: "TK B",
      has_special_needs: false
    },
    {
      id: 16,
      user_id: 19,
      full_name: "Anak Pengguna",
      gender: "female" as const,
      birth_date: new Date("2025-06-28T12:24:17.162Z"),
      age: 6,
      has_special_needs: true
    },
    {
      id: 18,
      user_id: 21,
      full_name: "austin",
      gender: "male" as const,
      birth_date: new Date("2020-12-31T17:00:00.000Z"),
      age: 4,
      has_special_needs: false
    }
  ];

  for (const child of children) {
    await prisma.child.create({ data: child });
  }

  // Seed Material Progress
  const materialProgress = [
    {
      id: 6,
      user_id: 6,
      child_id: 11,
      material_id: 1,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T11:28:33.172Z"),
      last_accessed: new Date("2025-06-29T14:19:53.013Z")
    },
    {
      id: 10,
      user_id: 6,
      child_id: 11,
      material_id: 2,
      status: "in_progress" as const,
      last_accessed: new Date("2025-06-28T11:28:54.765Z")
    },
    {
      id: 12,
      user_id: 6,
      child_id: 11,
      material_id: 3,
      status: "in_progress" as const,
      last_accessed: new Date("2025-06-28T11:29:17.311Z")
    },
    {
      id: 18,
      user_id: 16,
      child_id: 14,
      material_id: 2,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:16:49.418Z"),
      last_accessed: new Date("2025-06-29T09:30:12.474Z")
    },
    {
      id: 20,
      user_id: 1,
      child_id: 1,
      material_id: 9,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:21:37.078Z"),
      last_accessed: new Date("2025-06-28T12:21:36.277Z")
    },
    {
      id: 22,
      user_id: 19,
      child_id: 16,
      material_id: 4,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:24:51.170Z"),
      last_accessed: new Date("2025-06-28T15:15:36.219Z")
    },
    {
      id: 24,
      user_id: 19,
      child_id: 16,
      material_id: 5,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:31:24.025Z"),
      last_accessed: new Date("2025-06-28T12:31:23.105Z")
    },
    {
      id: 30,
      user_id: 1,
      child_id: 1,
      material_id: 8,
      status: "completed" as const,
      completed_at: new Date("2025-06-29T14:14:56.971Z"),
      last_accessed: new Date("2025-06-30T13:56:29.890Z")
    },
    {
      id: 34,
      user_id: 21,
      child_id: 18,
      material_id: 1,
      status: "completed" as const,
      completed_at: new Date("2025-06-30T03:20:43.779Z"),
      last_accessed: new Date("2025-06-30T03:20:42.532Z")
    },
    {
      id: 36,
      user_id: 21,
      child_id: 18,
      material_id: 2,
      status: "completed" as const,
      completed_at: new Date("2025-06-30T03:21:05.680Z"),
      last_accessed: new Date("2025-06-30T03:21:05.653Z")
    },
    {
      id: 40,
      user_id: 21,
      child_id: 18,
      material_id: 3,
      status: "in_progress" as const,
      last_accessed: new Date("2025-06-30T03:21:30.089Z")
    },
    {
      id: 44,
      user_id: 16,
      child_id: 14,
      material_id: 1,
      status: "completed" as const,
      completed_at: new Date("2025-06-30T13:53:19.511Z"),
      last_accessed: new Date("2025-06-30T13:53:14.790Z")
    }
  ];

  for (const progress of materialProgress) {
    await prisma.materialProgress.create({ data: progress });
  }

  // Seed Webinar Registrations
  await prisma.webinarRegistration.createMany({
    data: [
      {
        id: 1,
        user_id: 6,
        webinar_id: 1,
        registered_at: new Date("2025-06-28T11:32:30.497Z")
      },
      {
        id: 3,
        user_id: 19,
        webinar_id: 1,
        registered_at: new Date("2025-06-28T12:32:37.871Z")
      }
    ]
  });

  // Seed Daily Progress
  await prisma.dailyProgress.createMany({
    data: [
      {
        id: 1,
        user_id: 6,
        date: new Date("2025-06-27"),
        learning_minutes: 6
      },
      {
        id: 7,
        user_id: 16,
        date: new Date("2025-06-27"),
        learning_minutes: 3
      },
      {
        id: 9,
        user_id: 1,
        date: new Date("2025-06-27"),
        learning_minutes: 1
      },
      {
        id: 10,
        user_id: 19,
        date: new Date("2025-06-27"),
        learning_minutes: 4
      },
      {
        id: 13,
        user_id: 16,
        date: new Date("2025-06-28"),
        learning_minutes: 3
      },
      {
        id: 14,
        user_id: 1,
        date: new Date("2025-06-28"),
        learning_minutes: 1
      },
      {
        id: 15,
        user_id: 6,
        date: new Date("2025-06-28"),
        learning_minutes: 3
      },
      {
        id: 16,
        user_id: 21,
        date: new Date("2025-06-29"),
        learning_minutes: 6
      },
      {
        id: 22,
        user_id: 16,
        date: new Date("2025-06-29"),
        learning_minutes: 2
      },
      {
        id: 23,
        user_id: 1,
        date: new Date("2025-06-29"),
        learning_minutes: 3
      }
    ]
  });

  // Reset all sequences to prevent ID conflicts
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Child"', 'id'), (SELECT MAX(id) FROM "Child"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Material"', 'id'), (SELECT MAX(id) FROM "Material"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"MaterialProgress"', 'id'), (SELECT MAX(id) FROM "MaterialProgress"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Tip"', 'id'), (SELECT MAX(id) FROM "Tip"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Webinar"', 'id'), (SELECT MAX(id) FROM "Webinar"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"WebinarRegistration"', 'id'), (SELECT MAX(id) FROM "WebinarRegistration"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Doctor"', 'id'), (SELECT MAX(id) FROM "Doctor"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"dailyprogress"', 'id'), (SELECT MAX(id) FROM "dailyprogress"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"faqs"', 'id'), (SELECT MAX(id) FROM "faqs"));`;

  console.log('✅ Database seeded successfully!');
  console.log('✅ All sequences have been reset!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

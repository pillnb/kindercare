const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const balancedMaterials = [
  {
    id: 1,
    content: `[JUDUL]Kenali Bagian Tubuhmu

Tubuh kita adalah anugerah yang luar biasa! Setiap hari, tubuh kita bekerja keras untuk membantu kita bermain, belajar, dan melakukan hal-hal menyenangkan. Mari kita kenali lebih dekat bagian-bagian tubuh kita dan pelajari cara menjaganya dengan baik.

[SUBJUDUL]Kenapa Ini Penting?

Mengenal tubuh kita sendiri adalah langkah pertama untuk hidup sehat dan aman. Ketika kita memahami tubuh kita, kita bisa lebih baik dalam menjaga kesehatan, mengenali ketika ada yang tidak beres, dan yang paling penting, memahami batasan pribadi kita.

Setiap bagian tubuh memiliki fungsi yang istimewa. Mata kita bisa melihat warna-warni dunia, telinga mendengar musik indah, dan tangan kita bisa memeluk orang terkasih. Semua bagian ini bekerja sama untuk membuat kita menjadi diri kita yang unik.

[HIGHLIGHT]Tubuhmu adalah milikmu! Kamu yang menentukan siapa yang boleh menyentuhnya dan siapa yang tidak.

[SUBJUDUL]Bagian Tubuh Kita

Tubuh kita terdiri dari banyak bagian yang masing-masing punya tugas khusus. Ada bagian yang bisa kita tunjukkan dengan bebas kepada orang lain, dan ada bagian yang lebih pribadi.

[LIST]Kepala dan Wajah: Tempat otak pintar kita bekerja, mata untuk melihat, hidung untuk mencium, dan mulut untuk berbicara
[LIST]Lengan dan Tangan: Untuk memeluk, menulis, bermain, dan melakukan aktivitas seru
[LIST]Tubuh (Dada dan Perut): Tempat jantung dan organ penting lainnya bekerja dengan rajin
[LIST]Kaki: Untuk berjalan, berlari, melompat, dan bermain

Semua bagian ini bekerja sama seperti sebuah tim yang hebat. Jantung memompa darah, paru-paru membantu kita bernapas, dan otak mengatur semuanya seperti seorang kapten yang bijak.

[SUBJUDUL]Bagian Pribadi - Area Spesial

Ada bagian tubuh yang sangat spesial dan pribadi. Bagian ini biasanya ditutup oleh pakaian dalam dan hanya boleh dilihat atau disentuh oleh diri kita sendiri. Ini seperti ruang rahasia pribadi yang hanya milik kita.

[PENTING]Bagian pribadi adalah area yang biasanya ditutup oleh pakaian dalam. Ini adalah area yang sangat spesial dan hanya boleh disentuh oleh dirimu sendiri.

Terkadang, orang dewasa yang kita percaya seperti orang tua atau dokter mungkin perlu membantu kita dengan bagian pribadi ini. Tapi mereka harus selalu menjelaskan mengapa mereka perlu melakukannya, dan kita harus merasa nyaman dengan alasan tersebut.

[INFO]Pengecualian: Orang tua atau dokter boleh menyentuh bagian pribadi hanya saat membantu membersihkan atau memeriksa kesehatan, dan kamu harus tahu alasannya.

[HIGHLIGHT]Ingat: Jika ada yang menyentuh bagian pribadimu dan membuatmu tidak nyaman, segera bilang "TIDAK" dan lapor ke orang dewasa yang kamu percaya!

Tubuh kita juga memiliki "sistem alarm" alami. Ketika ada sesuatu yang tidak beres atau membuat kita tidak nyaman, tubuh kita akan memberikan sinyal. Misalnya, perut terasa aneh, jantung berdebar kencang, atau kita merasa takut. Ini adalah cara tubuh kita melindungi diri.`
  },
  {
    id: 2,
    content: `[JUDUL]Tubuhku adalah Milikku

Setiap orang memiliki tubuh yang unik dan istimewa. Tubuhmu adalah rumah untuk jiwamu, tempat yang paling berharga yang harus kamu jaga dan lindungi. Tidak ada orang lain yang boleh menentukan apa yang terjadi pada tubuhmu tanpa persetujuanmu.

[SUBJUDUL]Apa Artinya "Tubuhku adalah Milikku"?

Ini adalah konsep yang sangat penting untuk dipahami. Artinya, kamu memiliki kontrol penuh atas tubuhmu sendiri. Kamu berhak memutuskan siapa yang boleh menyentuhmu, kapan, dan bagaimana caranya.

Bayangkan tubuhmu seperti rumah pribadi yang hanya milikmu. Sama seperti rumah yang memiliki pintu dan kunci, tubuhmu juga memiliki batasan-batasan yang harus dihormati oleh orang lain. Kamu adalah pemilik rumah itu, jadi kamu yang memutuskan siapa yang boleh masuk dan siapa yang tidak.

[HIGHLIGHT]Kamu adalah boss dari tubuhmu sendiri! Tidak ada orang lain yang boleh membuat keputusan tentang tubuhmu tanpa izinmu.

[SUBJUDUL]Hak-Hak Tubuhmu

Sebagai pemilik tubuhmu, kamu memiliki beberapa hak yang sangat penting dan tidak boleh dilanggar oleh siapa pun.

[LIST]Hak untuk mengatakan "TIDAK" jika tidak mau disentuh
[LIST]Hak untuk merasa aman dan nyaman dengan tubuhmu
[LIST]Hak untuk meminta bantuan jika ada yang membuatmu tidak nyaman
[LIST]Hak untuk tahu alasan jika ada yang perlu menyentuh tubuhmu

Hak-hak ini berlaku untuk semua orang, tidak peduli siapa mereka. Bahkan jika itu adalah orang yang kamu kenal atau sayangi, mereka tetap harus menghormati hak-hakmu.

[SUBJUDUL]Batasan yang Sehat

Setiap orang perlu memahami konsep batasan pribadi. Batasan ini seperti garis tak terlihat yang melindungi ruang pribadimu. Ada batasan fisik dan batasan emosional.

Batasan fisik berkaitan dengan siapa yang boleh menyentuh tubuhmu dan bagaimana caranya. Batasan emosional berkaitan dengan bagaimana orang lain berbicara denganmu dan memperlakukanmu.

[INFO]Contoh batasan yang sehat:

[LIST]Tidak semua orang boleh memelukmu jika kamu tidak mau
[LIST]Bagian pribadi tubuhmu hanya boleh disentuh untuk alasan kesehatan
[LIST]Tidak ada yang boleh memaksamu melakukan sesuatu yang membuatmu takut
[LIST]Kamu boleh minta waktu sendiri jika butuh ruang pribadi

[PENTING]Ingat: Batasan yang sehat bukan berarti kamu tidak ramah. Ini artinya kamu pintar menjaga diri sendiri!

[SUBJUDUL]Kapan Harus Berkata "TIDAK"

Ada kalanya kamu perlu berkata "TIDAK" dengan tegas untuk melindungi dirimu. Ini bukan hal yang kasar atau tidak sopan - ini adalah cara kamu menjaga keamanan dirimu sendiri.

Kamu boleh dan harus berkata "TIDAK" jika ada yang memintamu melakukan sesuatu yang membuatmu tidak nyaman, takut, atau bingung. Perasaanmu adalah panduan yang baik untuk mengetahui kapan harus menolak.        [HIGHLIGHT]Kata "TIDAK" adalah kata yang sangat powerful! Jangan takut menggunakannya untuk melindungi dirimu.

Orang dewasa yang baik akan selalu menghormati kata "TIDAK" darimu. Jika ada yang marah atau mencoba memaksamu setelah kamu berkata "TIDAK", itu adalah tanda bahaya dan kamu harus segera mencari bantuan.`
  },
  {
    id: 3,
    content: `[JUDUL]Perbedaan Anak Laki-laki dan Perempuan

Dunia ini indah karena keberagamannya! Sama seperti bunga yang memiliki berbagai warna dan bentuk, manusia juga diciptakan dengan keunikan masing-masing. Anak laki-laki dan perempuan memiliki beberapa perbedaan, tapi yang terpenting adalah kita semua berharga dan istimewa.

[SUBJUDUL]Kita Semua Istimewa!

Setiap orang terlahir unik dan istimewa dengan caranya masing-masing. Ada yang tinggi, ada yang pendek, ada yang rambutnya keriting, ada yang lurus. Begitu juga dengan jenis kelamin - ada anak laki-laki dan ada anak perempuan, dan keduanya sama-sama berharga.

Yang membuat kita spesial bukan hanya bagaimana penampilan kita, tapi juga kepribadian, bakat, mimpi, dan cara kita memperlakukan orang lain. Ada anak laki-laki yang suka memasak, ada anak perempuan yang suka sepak bola, dan itu semua normal dan menyenangkan!

[HIGHLIGHT]Perbedaan itu indah! Yang membuat kita spesial bukan hanya fisik, tapi juga kepribadian, bakat, dan mimpi kita.

[SUBJUDUL]Perbedaan Fisik

Meskipun banyak persamaan, ada beberapa perbedaan fisik antara anak laki-laki dan perempuan. Perbedaan ini adalah hal yang normal dan alami.

[LIST]Anak laki-laki memiliki penis dan testis sebagai bagian pribadinya
[LIST]Anak perempuan memiliki vagina sebagai bagian pribadinya
[LIST]Saat dewasa nanti, tubuh akan mengalami perubahan yang berbeda

Ketika kita tumbuh besar nanti, tubuh kita akan mengalami perubahan. Ini seperti kupu-kupu yang berubah dari ulat - semua perubahan ini adalah bagian alami dari pertumbuhan. Suara anak laki-laki mungkin akan menjadi lebih berat, sementara anak perempuan akan mengalami perubahan lain.

[SUBJUDUL]Yang Sama Pentingnya

Meskipun ada perbedaan fisik, ada banyak hal yang sama antara anak laki-laki dan perempuan. Kita semua punya perasaan, mimpi, dan kemampuan yang luar biasa.

[INFO]Baik laki-laki maupun perempuan bisa menjadi apa saja: dokter, guru, pilot, chef, atau profesi lainnya!

[LIST]Semua anak berhak merasa aman dan dilindungi
[LIST]Semua anak boleh mengekspresikan perasaan mereka
[LIST]Semua anak pantas dihormati dan disayangi
[LIST]Semua anak boleh bermain dengan mainan apa saja yang mereka suka

Ingatlah bahwa tidak ada pekerjaan, hobi, atau aktivitas yang khusus hanya untuk anak laki-laki atau perempuan. Yang penting adalah kita melakukan hal yang kita sukai dan membuat kita bahagia, selama itu tidak merugikan orang lain.

[PENTING]Yang terpenting bukan jenis kelaminmu, tapi bagaimana kamu menjadi orang yang baik, peduli, dan bahagia!`
  },
  {
    id: 4,
    content: `[JUDUL]Aturan Sentuhan Aman

Sentuhan adalah salah satu cara kita berkomunikasi dengan orang lain. Ada sentuhan yang membuat kita merasa hangat, dicintai, dan aman. Tapi ada juga sentuhan yang membuat kita tidak nyaman atau takut. Penting bagi kita untuk belajar membedakan keduanya.

[SUBJUDUL]Mengenal Jenis Sentuhan

Dalam kehidupan sehari-hari, kita sering bersentuhan dengan orang lain. Mulai dari berjabat tangan dengan guru, berpelukan dengan keluarga, hingga high-five dengan teman. Semua sentuhan ini memiliki makna dan perasaan yang berbeda.

Tubuh kita memiliki "sensor" alami yang bisa merasakan apakah sebuah sentuhan itu baik atau tidak. Ketika kita merasa nyaman, tubuh kita akan rileks. Tapi ketika ada yang tidak beres, tubuh kita akan memberikan sinyal peringatan seperti perut yang terasa aneh atau jantung yang berdebar kencang.

[HIGHLIGHT]Tubuhmu punya "alarm" alami! Jika sentuhan membuat perutmu terasa aneh atau tidak nyaman, itu tandanya ada yang tidak beres.

[SUBJUDUL]Sentuhan yang Aman dan Nyaman

Ada banyak jenis sentuhan yang membuat kita merasa bahagia dan aman. Sentuhan ini biasanya dilakukan dengan izin kita dan membuat kita merasa dicintai.

[LIST]Pelukan hangat dari orang tua atau keluarga
[LIST]Salaman atau tepuk tangan saat bertemu teman
[LIST]Sentuhan lembut saat diobati ketika terluka
[LIST]High-five dengan teman setelah bermain

Sentuhan yang aman biasanya dilakukan secara terbuka, bukan sembunyi-sembunyi. Orang yang memberikan sentuhan aman juga tidak akan marah jika kita menolak atau tidak ingin disentuh pada saat tertentu.

[SUBJUDUL]Sentuhan yang Tidak Aman

Sayangnya, tidak semua sentuhan itu baik. Ada sentuhan yang bisa membahayakan kita atau membuat kita merasa tidak nyaman. Penting untuk kita mengenali tanda-tandanya.

[PENTING]Jika ada yang menyentuh bagian pribadimu tanpa alasan kesehatan yang jelas

[PENTING]Sentuhan yang membuatmu takut, sedih, atau bingung

[PENTING]Sentuhan sambil bilang "ini rahasia, jangan bilang siapa-siapa"

Sentuhan yang tidak aman juga sering disertai dengan ancaman atau janji hadiah yang aneh. Misalnya, "Kalau kamu bilang ke mama papa, kamu akan dimarahi" atau "Kalau kamu diam-diam, nanti dapat mainan."

[SUBJUDUL]Apa yang Harus Dilakukan?

Jika kamu mengalami sentuhan yang tidak aman, ada beberapa hal yang bisa kamu lakukan untuk melindungi diri.

[INFO]Jika ada sentuhan yang membuatmu tidak nyaman:

[LIST]Katakan "TIDAK!" dengan tegas jika kamu merasa tidak nyaman
[LIST]Pergi dari tempat itu secepat mungkin jika bisa
[LIST]Ceritakan segera ke orang dewasa yang kamu percaya
[LIST]Ingat: Kamu tidak akan dimarahi karena menceritakan hal ini

Yang penting untuk diingat adalah ini bukan salahmu. Orang dewasa yang baik tidak akan pernah membuat anak merasa takut atau tidak nyaman. Jika ada yang melakukan hal buruk, itu salah mereka, bukan salahmu.

[HIGHLIGHT]Kamu selalu punya hak untuk mengatakan "TIDAK" pada sentuhan yang membuatmu tidak nyaman, bahkan dari orang yang kamu kenal!`
  },
  {
    id: 5,
    content: `[JUDUL]Siapa yang Bisa Dipercaya?

Dalam perjalanan hidup kita, kita akan bertemu dengan banyak orang. Ada yang menjadi teman baik, ada yang menjadi guru, dan ada yang menjadi bagian dari keluarga kita. Namun, tidak semua orang memiliki niat baik. Oleh karena itu, penting bagi kita untuk belajar mengenali siapa yang bisa dipercaya.

[SUBJUDUL]Mengenal Orang-orang di Sekitar Kita

Setiap hari, kita berinteraksi dengan berbagai orang. Ada yang sudah kita kenal lama, ada yang baru kita temui. Masing-masing memiliki peran yang berbeda dalam hidup kita, dan tingkat kepercayaan yang kita berikan juga berbeda.

Orang yang bisa dipercaya adalah mereka yang selalu memikirkan kebaikan kita, tidak pernah membuat kita takut atau tidak nyaman, dan selalu jujur dalam perkataan dan perbuatan mereka. Mereka juga menghormati batasan-batasan kita dan tidak memaksa kita melakukan hal yang tidak kita inginkan.

[HIGHLIGHT]Orang yang benar-benar peduli padamu tidak akan pernah memintamu menyimpan rahasia yang membuatmu takut atau tidak nyaman.

[SUBJUDUL]Orang yang Bisa Dipercaya Sepenuhnya

Ada beberapa orang dalam hidup kita yang biasanya bisa kita percaya sepenuhnya. Mereka adalah orang-orang yang sudah membuktikan kasih sayang dan perhatian mereka kepada kita.

[LIST]Orang tua atau wali yang merawatmu
[LIST]Kakek, nenek, atau keluarga dekat yang kamu kenal baik
[LIST]Guru di sekolah yang sudah dikenal orang tuamu
[LIST]Dokter keluarga yang sudah dipercaya orang tuamu

Orang-orang ini biasanya sudah lama ada dalam hidup kita dan telah menunjukkan bahwa mereka benar-benar peduli dengan keselamatan dan kebahagiaan kita. Mereka juga adalah orang yang akan melindungi kita jika ada masalah.

[SUBJUDUL]Orang yang Perlu Hati-hati

Meskipun kebanyakan orang adalah orang baik, kita tetap perlu waspada. Bahkan dengan orang yang kita kenal, kita harus tetap memperhatikan tanda-tanda yang mencurigakan.

[INFO]Bahkan dengan orang yang kita kenal, tetap penting untuk waspada jika:

[LIST]Mereka meminta kamu menyimpan rahasia tentang sentuhan
[LIST]Mereka memberikan hadiah dengan syarat aneh
[LIST]Mereka memintamu melakukan sesuatu yang membuatmu tidak nyaman
[LIST]Mereka mengajakmu pergi tanpa izin orang tua

Ingat, orang yang berniat buruk tidak selalu terlihat menakutkan. Mereka bisa saja orang yang kita kenal dan awalnya bersikap baik kepada kita. Itulah mengapa kita perlu selalu memperhatikan perasaan kita sendiri.

[SUBJUDUL]Tanda-tanda Orang yang Baik

Orang dewasa yang benar-benar peduli dengan kita memiliki ciri-ciri tertentu. Mereka akan selalu menghormati kita sebagai individu dan tidak akan memaksa kita melakukan sesuatu yang tidak kita inginkan.

[PENTING]Orang dewasa yang baik akan:

[LIST]Menghormati kata "TIDAK" darimu
[LIST]Tidak memaksamu melakukan sesuatu yang tidak kamu mau
[LIST]Tidak marah jika kamu bercerita ke orang tua
[LIST]Tidak meminta kamu menyimpan rahasia yang aneh

Mereka juga akan selalu transparan dalam tindakan mereka. Jika mereka perlu melakukan sesuatu yang melibatkan kita, mereka akan menjelaskan alasannya dengan jelas dan meminta izin terlebih dahulu.

[HIGHLIGHT]Ingat: Jika ada yang membuatmu bingung atau takut, selalu ceritakan ke orang tua atau guru. Mereka ada untuk melindungimu!

Kepercayaan itu seperti bunga yang perlu waktu untuk tumbuh. Tidak perlu terburu-buru mempercayai orang baru. Berikan waktu untuk mengenal mereka lebih baik dan lihat apakah mereka konsisten dalam menunjukkan kebaikan.`
  },
  {
    id: 6,
    content: `[JUDUL]Rahasia Baik vs Rahasia Buruk

Rahasia adalah bagian yang menarik dalam kehidupan kita. Kadang-kadang kita memiliki rahasia yang membuat kita tersenyum, seperti surprise ulang tahun untuk teman atau hadiah untuk mama papa. Tapi ada juga rahasia yang membuat perut kita terasa aneh dan tidak nyaman. Mari kita belajar membedakan keduanya!

[SUBJUDUL]Apa Itu Rahasia?

Rahasia adalah sesuatu yang kita simpan dan tidak langsung kita ceritakan ke semua orang. Seperti kotak harta karun yang kita buka hanya untuk orang-orang tertentu. Rahasia bisa membuat hidup lebih menarik, tapi juga bisa menjadi beban jika tidak tepat.

Dalam kehidupan sehari-hari, kita sering menemui berbagai jenis rahasia. Ada yang membuat kita excited menunggunya, ada yang membuat kita merasa spesial karena dipercaya, dan sayangnya ada juga yang membuat kita merasa takut atau bingung.

[HIGHLIGHT]Rahasia yang baik membuat hatimu hangat dan excited, bukan takut atau bingung!

[SUBJUDUL]Rahasia yang Baik dan Menyenangkan

Rahasia yang baik adalah rahasia yang membuat kita merasa senang dan excited. Biasanya rahasia ini akan segera terbuka dan tidak akan merugikan siapa pun.

[LIST]Surprise party untuk ulang tahun teman
[LIST]Hadiah yang sedang disiapkan untuk keluarga
[LIST]Proyek art yang akan dipamerkan di sekolah
[LIST]Rencana piknik keluarga yang masih dirahasiakan

Rahasia baik memiliki ciri khas: ada batas waktunya. Seperti kado yang dibungkus rapi, rahasia baik pasti akan dibuka pada waktu yang tepat dan membuat semua orang senang. Tidak ada yang akan terluka atau sedih ketika rahasia ini terbuka.

[INFO]Rahasia yang baik biasanya punya "tanggal kedaluwarsa" - akan terbuka pada waktu yang tepat!

[SUBJUDUL]Rahasia yang Tidak Baik

Sayangnya, tidak semua rahasia itu menyenangkan. Ada rahasia yang membuat kita merasa tidak nyaman, takut, atau bingung. Rahasia seperti ini biasanya diminta oleh orang yang tidak memiliki niat baik.

[PENTING]Waspadai jika ada yang meminta kamu menyimpan rahasia tentang:

[LIST]Sentuhan pada bagian pribadi tubuhmu
[LIST]Hal yang membuatmu takut atau tidak nyaman
[LIST]Ancaman atau hal-hal yang menakutkan
[LIST]Permintaan untuk tidak bercerita ke orang tua

Rahasia buruk biasanya disertai dengan ancaman atau iming-iming hadiah yang aneh. Mereka yang meminta kita menyimpan rahasia buruk sering bilang "Jangan bilang siapa-siapa, nanti kamu akan dapat masalah" atau "Ini rahasia kita berdua saja."

[SUBJUDUL]Perbedaan yang Mudah Dikenali

Ada cara mudah untuk membedakan rahasia baik dan rahasia buruk. Kita bisa mendengarkan apa yang dikatakan oleh hati dan perut kita.

Ketika mendengar rahasia baik, biasanya kita merasa:
- Excited dan tidak sabar menunggu waktunya tiba
- Senang karena dipercaya
- Yakin bahwa ini akan membuat orang lain bahagia

Ketika diminta menyimpan rahasia buruk, tubuh kita akan memberikan sinyal:
- Perut terasa aneh atau mual
- Jantung berdebar tidak karuan
- Merasa takut atau bingung

[HIGHLIGHT]Dengarkan tubuhmu! Jika rahasia membuat perutmu tidak nyaman, itu bukan rahasia yang baik.

[SUBJUDUL]Apa yang Harus Dilakukan?

Jika kamu diminta menyimpan rahasia yang membuatmu tidak nyaman, ingatlah bahwa kamu punya hak untuk menolak dan menceritakannya ke orang dewasa yang kamu percaya.

[INFO]Yang harus kamu lakukan:

[LIST]Katakan "Aku tidak bisa menyimpan rahasia ini"
[LIST]Ceritakan segera ke orang tua, guru, atau orang dewasa yang dipercaya
[LIST]Ingat: Kamu tidak akan dimarahi karena menceritakan rahasia buruk
[LIST]Kamu membantu melindungi diri sendiri dan mungkin anak lain

Orang dewasa yang baik akan bangga padamu karena berani bercerita. Mereka tidak akan marah, malah akan membantu menyelesaikan masalah dan memastikan kamu tetap aman.`
  },
  {
    id: 7,
    content: `[JUDUL]Tubuhku Adalah Milikku

Tubuh kita adalah hadiah yang paling berharga yang kita miliki. Seperti rumah yang nyaman, tubuh kita adalah tempat tinggal jiwa kita. Kita yang menentukan siapa yang boleh masuk, kapan, dan bagaimana caranya. Tidak ada orang lain yang punya hak untuk mengatur tubuh kita tanpa izin kita.

[SUBJUDUL]Rumahku, Aturanku

Bayangkan tubuhmu seperti sebuah rumah yang indah. Di rumah ini, kamu adalah raja atau ratu yang menentukan semua aturan. Siapa yang boleh masuk, bagian mana yang privat, dan aktivitas apa yang boleh dilakukan - semua keputusan ada di tanganmu.

Seperti rumah yang memiliki pintu dan jendela, tubuh kita juga memiliki batasan-batasan. Ada area publik yang bisa dilihat orang lain, ada area semi-privat yang hanya untuk orang terdekat, dan ada area yang sangat privat yang hanya untuk diri kita sendiri.

[HIGHLIGHT]Kamu adalah bos dari tubuhmu sendiri! Tidak ada yang boleh membuat aturan tentang tubuhmu selain dirimu sendiri.

[SUBJUDUL]Hak-hak Tubuhku

Sebagai pemilik tubuh, kita memiliki hak-hak yang tidak boleh dilanggar oleh siapa pun. Hak-hak ini seperti undang-undang yang melindungi kita.

[LIST]Hak untuk mengatakan "TIDAK" pada sentuhan yang tidak kita inginkan
[LIST]Hak untuk merasa aman dan nyaman dengan tubuh kita
[LIST]Hak untuk mendapat penjelasan jika ada yang perlu menyentuh kita
[LIST]Hak untuk menceritakan jika ada yang membuat kita tidak nyaman

Hak-hak ini berlaku untuk semua situasi dan dengan siapa pun, bahkan dengan orang yang kita kenal baik. Tidak ada yang boleh mengambil hak ini dari kita, tidak peduli seberapa besar atau dewasa mereka.

[SUBJUDUL]Situasi Khusus yang Wajar

Memang ada beberapa situasi di mana orang dewasa yang kita percaya mungkin perlu menyentuh tubuh kita. Tapi ini hanya dalam situasi tertentu dan dengan alasan yang jelas.

[INFO]Situasi yang wajar dan aman:

[LIST]Orang tua membantu mandi atau berpakaian (untuk anak kecil)
[LIST]Dokter memeriksa kesehatan dengan izin orang tua
[LIST]Perawat di sekolah menolong saat terluka
[LIST]Guru olahraga membantu postur saat belajar gerakan

Yang penting, dalam situasi-situasi ini, orang dewasa akan selalu menjelaskan apa yang mereka lakukan dan mengapa mereka perlu melakukannya. Mereka juga akan berusaha membuat kita merasa nyaman dan tidak takut.

[PENTING]Orang dewasa yang baik akan selalu menjelaskan alasan mereka dan memastikan kamu merasa nyaman.

[SUBJUDUL]Kapan Harus Waspada

Ada beberapa tanda yang harus membuat kita waspada. Jika ada situasi yang membuatmu merasa aneh atau tidak nyaman, percayalah pada instingmu.

Waspadai jika ada yang:
- Menyentuh tubuhmu tanpa alasan yang jelas
- Meminta kamu melepas pakaian tanpa alasan medis
- Bilang "Jangan bilang siapa-siapa tentang ini"
- Memberikan hadiah sambil meminta sesuatu yang aneh
- Membuat kamu merasa takut atau bingung

[HIGHLIGHT]Jika ada yang membuat tubuhmu tidak nyaman, segera katakan "STOP!" dan lari mencari bantuan.

[SUBJUDUL]Menjaga Benteng Tubuhku

Tubuh kita seperti benteng yang kuat, dan kita adalah penjaga yang pemberani. Ada beberapa cara untuk menjaga benteng kita tetap aman dan terlindungi.

[LIST]Selalu dengarkan perasaan dan instingmu
[LIST]Berani mengatakan "TIDAK" dengan tegas
[LIST]Cari bantuan segera jika merasa tidak aman
[LIST]Ceritakan ke orang dewasa yang dipercaya

Ingat, menjaga tubuh bukan berarti kita harus takut pada semua orang. Kebanyakan orang di dunia ini adalah orang baik yang ingin melindungi kita. Tapi tetap penting untuk selalu waspada dan mempercayai perasaan kita sendiri.

[INFO]Tubuh yang sehat dan aman adalah fondasi untuk hidup yang bahagia dan percaya diri!

Ketika kita merasa aman dengan tubuh kita sendiri, kita bisa lebih percaya diri dalam bermain, belajar, dan berteman. Seperti pohon yang akarnya kuat, kepercayaan diri tentang tubuh akan membantu kita tumbuh menjadi orang yang kuat dan bahagia.`
  },
  {
    id: 8,
    content: `[JUDUL]Tubuhku Mulai Berubah

Pertumbuhan adalah petualangan yang paling menakjubkan dalam hidup kita! Seperti kupu-kupu yang berubah dari kepompong, tubuh kita juga akan mengalami perubahan-perubahan yang menakjubkan saat kita tumbuh besar. Ini adalah proses alami yang dialami semua orang di dunia.

[SUBJUDUL]Petualangan Pertumbuhan

Setiap makhluk hidup di dunia ini mengalami pertumbuhan. Biji kecil tumbuh menjadi pohon besar, anak kucing tumbuh menjadi kucing dewasa, dan kita pun akan tumbuh dari anak-anak menjadi remaja, lalu dewasa. Setiap tahap memiliki keunikan dan keindahannya sendiri.

Pertumbuhan bukan hanya tentang menjadi lebih tinggi atau lebih besar. Tubuh kita akan mengalami berbagai perubahan yang mempersiapkan kita untuk tahap kehidupan selanjutnya. Seperti mobil yang di-upgrade agar bisa pergi ke tempat yang lebih jauh, tubuh kita juga sedang mempersiapkan diri.

[HIGHLIGHT]Setiap perubahan dalam tubuhmu adalah bukti bahwa kamu sedang tumbuh menjadi versi terbaik dari dirimu!

[SUBJUDUL]Perubahan yang Akan Terjadi

Meskipun setiap orang unik, ada beberapa perubahan umum yang akan dialami semua anak saat memasuki masa remaja. Perubahan ini biasanya dimulai antara usia 8-14 tahun, dan setiap orang memiliki waktunya masing-masing.

[LIST]Tinggi badan bertambah dengan cepat
[LIST]Suara mungkin berubah, terutama untuk anak laki-laki
[LIST]Rambut mulai tumbuh di tempat-tempat baru
[LIST]Bentuk tubuh mulai berubah secara bertahap

Perubahan ini terjadi karena tubuh kita mulai memproduksi hormon-hormon baru. Hormon adalah seperti surat khusus yang dikirim oleh otak ke seluruh tubuh, memberitahu bagian-bagian tubuh untuk mulai berubah.

[SUBJUDUL]Perubahan untuk Anak Perempuan

Anak perempuan akan mengalami beberapa perubahan khusus saat tumbuh besar. Perubahan ini mempersiapkan mereka untuk menjadi wanita dewasa yang kuat dan cantik.

[INFO]Perubahan yang mungkin dialami anak perempuan:

[LIST]Payudara mulai tumbuh dan berkembang
[LIST]Pinggul mulai melebar secara natural
[LIST]Akan mengalami menstruasi (haid) suatu hari nanti
[LIST]Suara mungkin sedikit berubah, tapi tidak sedramatis anak laki-laki

Menstruasi adalah proses alami yang dialami semua wanita. Ini adalah tanda bahwa tubuh sedang sehat dan berkembang dengan normal. Tidak perlu takut atau malu - ini adalah bagian indah dari menjadi perempuan.

[SUBJUDUL]Perubahan untuk Anak Laki-laki

Anak laki-laki juga akan mengalami perubahan-perubahan yang mempersiapkan mereka menjadi pria dewasa yang tangguh dan baik hati.

[INFO]Perubahan yang mungkin dialami anak laki-laki:

[LIST]Suara akan berubah menjadi lebih berat dan dalam
[LIST]Otot-otot akan mulai berkembang lebih kuat
[LIST]Rambut akan tumbuh di wajah (kumis dan jenggot)
[LIST]Tinggi badan biasanya bertambah dengan sangat cepat

Perubahan suara pada anak laki-laki kadang membuat suara mereka "pecah" atau tidak stabil. Ini normal dan akan stabil setelah beberapa waktu. Seperti alat musik yang sedang di-tune, butuh waktu untuk mencapai nada yang sempurna.

[PENTING]Semua perubahan ini normal dan sehat - tidak ada yang perlu dikhawatirkan!

[SUBJUDUL]Menghadapi Perubahan dengan Positif

Perubahan bisa terasa menakutkan atau membingungkan, tapi sebenarnya ini adalah hal yang sangat istimewa. Kita sedang menjadi versi yang lebih dewasa dan kuat dari diri kita sendiri.

[LIST]Bicarakan dengan orang tua tentang perubahan yang kamu alami
[LIST]Baca buku atau artikel yang sesuai usia tentang pertumbuhan
[LIST]Jaga kebersihan tubuh dengan baik selama masa pertumbuhan
[LIST]Tetap aktif dan makan makanan sehat

Yang paling penting adalah ingat bahwa setiap orang memiliki waktu pertumbuhan yang berbeda. Ada yang cepat, ada yang lebih lambat, dan keduanya sama-sama normal. Seperti bunga yang mekar di waktu yang berbeda-beda, keindahan kita masing-masing akan muncul pada waktunya.

[HIGHLIGHT]Jangan bandingkan pertumbuhanmu dengan orang lain. Setiap orang punya waktu yang tepat untuk berkembang!

Pertumbuhan adalah hadiah yang indah. Nikmati setiap tahapnya dan bangga dengan perubahan yang terjadi pada tubuhmu. Kamu sedang menjadi orang yang luar biasa!`
  },
  {
    id: 9,
    content: `[JUDUL]Teman yang Baik dan Aman di Internet

Internet adalah dunia yang luar biasa luas dan penuh dengan hal-hal menarik! Di sana kita bisa belajar hal baru, bermain game seru, menonton video lucu, dan bahkan bertemu teman-teman dari berbagai tempat. Tapi seperti dunia nyata, internet juga memiliki aturan keamanan yang harus kita ikuti.

[SUBJUDUL]Dunia Maya yang Menakjubkan

Internet seperti perpustakaan raksasa yang tidak pernah tutup, taman bermain yang tidak pernah sepi, dan bioskop yang selalu ada film baru. Di dalamnya, kita bisa menemukan jawaban untuk hampir semua pertanyaan, bermain dengan teman-teman, dan mengekspresikan kreativitas kita.

Namun, sama seperti di dunia nyata, kita perlu belajar cara berinteraksi dengan orang lain dengan aman. Ada banyak orang baik di internet yang ingin berbagi ilmu dan kegembiraan, tapi sayangnya ada juga beberapa orang yang mungkin tidak memiliki niat baik.

[HIGHLIGHT]Internet itu seperti kota besar - penuh hal menarik, tapi kita perlu tahu jalan mana yang aman untuk dilalui!

[SUBJUDUL]Teman Baik di Dunia Maya

Teman yang baik di internet memiliki ciri-ciri yang sama dengan teman baik di dunia nyata. Mereka menghormati kita, tidak memaksa kita melakukan hal yang tidak kita inginkan, dan membuat kita merasa senang dan aman.

[LIST]Mereka tidak meminta informasi pribadi seperti alamat rumah atau nomor telepon
[LIST]Mereka tidak meminta foto diri kita dalam kondisi yang tidak pantas
[LIST]Mereka tidak mengajak bertemu secara langsung tanpa sepengetahuan orang tua
[LIST]Mereka tidak meminta kita menyimpan rahasia tentang percakapan kita

Teman yang baik di internet akan mengerti jika kita perlu bertanya dulu ke orang tua sebelum melakukan sesuatu. Mereka tidak akan terburu-buru atau memaksa kita mengambil keputusan dengan cepat.

[SUBJUDUL]Tanda-tanda yang Perlu Diwaspadai

Sayangnya, tidak semua orang di internet memiliki niat baik. Ada beberapa tanda yang harus membuat kita waspada dan segera mencari bantuan orang dewasa.

[PENTING]Waspadai jika ada yang:

[LIST]Meminta foto pribadi, terutama tanpa pakaian
[LIST]Mengajak bertemu langsung tanpa melibatkan orang tua
[LIST]Memberikan hadiah atau uang dengan syarat aneh
[LIST]Meminta kita merahasiakan percakapan dari orang tua

Orang dengan niat buruk sering menyamar sebagai anak seusia kita atau berpura-pura sangat peduli dan mengerti kita. Mereka mungkin akan berkata bahwa mereka adalah "teman spesial" yang berbeda dari teman lainnya.

[SUBJUDUL]Aturan Emas Internet

Ada beberapa aturan sederhana yang bisa membantu kita tetap aman saat menjelajahi dunia maya. Aturan ini seperti helm saat naik sepeda - melindungi kita agar bisa menikmati perjalanan dengan aman.

[INFO]Aturan penting untuk keamanan online:

[LIST]Jangan berikan informasi pribadi (nama lengkap, alamat, nomor telepon)
[LIST]Jangan posting foto yang menunjukkan lokasi rumah atau sekolah
[LIST]Selalu beritahu orang tua tentang teman baru di internet
[LIST]Jangan setuju bertemu orang yang baru dikenal online

Informasi pribadi itu seperti kunci rumah kita. Kita tidak akan memberikan kunci rumah ke sembarang orang, begitu juga dengan informasi pribadi di internet.

[SUBJUDUL]Berbagi dengan Bijak

Media sosial dan platform online memungkinkan kita berbagi momen-momen seru dalam hidup. Tapi penting untuk berpikir dua kali sebelum memposting sesuatu.

Sebelum memposting foto atau cerita, tanyakan pada diri sendiri:
- Apakah ini informasi yang aman untuk dibagikan?
- Apakah orang tua sudah tahu tentang apa yang akan saya posting?
- Apakah ini menunjukkan lokasi atau informasi pribadi?

[HIGHLIGHT]Sekali sesuatu dipublikasikan di internet, sulit untuk benar-benar menghapusnya. Jadi berpikirlah dua kali sebelum posting!

[SUBJUDUL]Ketika Ada Masalah

Jika kamu merasa tidak nyaman, takut, atau bingung dengan interaksi online, jangan ragu untuk segera mencari bantuan. Orang tua dan guru ada untuk melindungi kita, bukan untuk memarahi.

[LIST]Ceritakan segera ke orang tua jika ada yang membuatmu tidak nyaman
[LIST]Screenshot atau simpan bukti jika ada pesan yang mencurigakan
[LIST]Blokir dan laporkan akun yang berperilaku tidak pantas
[LIST]Ingat: Kamu tidak akan dimarahi karena melaporkan hal yang mencurigakan

Internet seharusnya menjadi tempat yang menyenangkan dan aman untuk belajar serta bermain. Dengan mengikuti aturan keamanan dan selalu berkomunikasi dengan orang dewasa yang kita percaya, kita bisa menikmati semua keajaiban dunia maya dengan aman dan bahagia!`
  }
];

async function updateBalancedContent() {
  console.log('📝 Memperbarui konten untuk SEMUA 9 materi dengan lebih banyak paragraf dan keseimbangan yang baik...');
  
  try {
    for (const material of balancedMaterials) {
      await prisma.material.update({
        where: { id: material.id },
        data: { content: material.content }
      });
      
      console.log(`✅ Berhasil memperbarui materi ID ${material.id}`);
    }
    
    console.log('🎉 Semua 9 materi berhasil diperbarui dengan keseimbangan yang lebih baik!');
    console.log('📖 Sekarang ada lebih banyak paragraf teks biasa yang memberikan konteks dan penjelasan mendalam');
    console.log('🎯 Highlight hanya digunakan untuk poin-poin yang benar-benar penting');
    console.log('🌟 Total 9 materi edukasi sudah menggunakan format modern dan ramah anak');
    
  } catch (error) {
    console.error('❌ Error saat memperbarui konten:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBalancedContent();

import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
  adapter,
  log: ['info', 'warn', 'error'],
});

function buildCheckInTimestamp(workDate: Date): Date {
  const timestamp = new Date(workDate);
  const offsetSeconds = Math.floor(Math.random() * 30 * 60);
  timestamp.setHours(
    7,
    30 + Math.floor(offsetSeconds / 60),
    offsetSeconds % 60,
    0,
  );
  return timestamp;
}

function buildCheckOutTimestamp(workDate: Date): Date {
  const timestamp = new Date(workDate);
  const offsetSeconds = Math.floor(Math.random() * 120 * 60);
  timestamp.setHours(
    16,
    Math.floor(offsetSeconds / 60),
    offsetSeconds % 60,
    0,
  );
  return timestamp;
}

function getPreviousWorkdayStart(currentDate = new Date()): Date {
  const workDate = new Date(currentDate);
  workDate.setDate(workDate.getDate() - 1);
  workDate.setHours(0, 0, 0, 0);
  return workDate;
}

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);
  const workDate = getPreviousWorkdayStart();

  const admin = await prisma.user.upsert({
    where: { email: 'hrd@ruangkerja.test' },
    update: {},
    create: {
      email: 'hrd@ruangkerja.test',
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
      employee: {
        create: {
          employeeCode: 'HRD-26001',
          fullName: 'Nadia Pramesthi',
          phone: '+62 811-0000-1000',
          department: 'Human Resources',
          position: 'HR Manager',
          joinDate: new Date('2020-01-01'),
          address: 'Kompleks Arunika, Gedung B, Bandung',
        },
      },
    },
    include: { employee: true },
  });

  console.log('✅ HRD account created: hrd@ruangkerja.test');

  const employeeData: {
    email: string;
    employeeCode: string;
    fullName: string;
    phone: string;
    department: string;
    position: string;
    joinDate: Date;
    address: string;
  }[] = [
    {
      email: 'aditya.pranawa@ruangkerja.test',
      employeeCode: 'WKF-26101',
      fullName: 'Aditya Pranawa',
      phone: '+62 811-0000-2101',
      department: 'Engineering',
      position: 'Backend Developer',
      joinDate: new Date('2022-03-01'),
      address: 'Jalan Puspa Raya 18, Bandung',
    },
    {
      email: 'salma.kinasih@ruangkerja.test',
      employeeCode: 'WKF-26102',
      fullName: 'Salma Kinasih',
      phone: '+62 811-0000-2102',
      department: 'Engineering',
      position: 'Frontend Developer',
      joinDate: new Date('2022-05-15'),
      address: 'Kompleks Cendana Asri 7, Cimahi',
    },
    {
      email: 'bagas.wicaksono@ruangkerja.test',
      employeeCode: 'WKF-26103',
      fullName: 'Bagas Wicaksono',
      phone: '+62 811-0000-2103',
      department: 'Human Resources',
      position: 'HR Manager',
      joinDate: new Date('2021-08-10'),
      address: 'Perumahan Puri Kencana 12, Sumedang',
    },
    {
      email: 'kirana.adiputri@ruangkerja.test',
      employeeCode: 'WKF-26104',
      fullName: 'Kirana Adiputri',
      phone: '+62 811-0000-2104',
      department: 'Finance',
      position: 'Accountant',
      joinDate: new Date('2023-01-05'),
      address: 'Jalan Melur Tengah 24, Garut',
    },
    {
      email: 'rafi.mahendra@ruangkerja.test',
      employeeCode: 'WKF-26105',
      fullName: 'Rafi Mahendra',
      phone: '+62 811-0000-2105',
      department: 'Engineering',
      position: 'DevOps Engineer',
      joinDate: new Date('2022-09-20'),
      address: 'Griya Panyileukan Blok D-5, Bandung',
    },
    {
      email: 'dinda.prameswari@ruangkerja.test',
      employeeCode: 'WKF-26106',
      fullName: 'Dinda Prameswari',
      phone: '+62 811-0000-2106',
      department: 'Marketing',
      position: 'Marketing Specialist',
      joinDate: new Date('2023-03-12'),
      address: 'Jalan Sawo Kecil 9, Tasikmalaya',
    },
    {
      email: 'yoga.pamungkas@ruangkerja.test',
      employeeCode: 'WKF-26107',
      fullName: 'Yoga Pamungkas',
      phone: '+62 811-0000-2107',
      department: 'Engineering',
      position: 'Mobile Developer',
      joinDate: new Date('2022-07-18'),
      address: 'Perumahan Taman Citra 3, Cirebon',
    },
    {
      email: 'nabila.suryani@ruangkerja.test',
      employeeCode: 'WKF-26108',
      fullName: 'Nabila Suryani',
      phone: '+62 811-0000-2108',
      department: 'Design',
      position: 'UI/UX Designer',
      joinDate: new Date('2023-06-01'),
      address: 'Jalan Kertajaya Selatan 31, Bandung',
    },
    {
      email: 'farhan.akbar@ruangkerja.test',
      employeeCode: 'WKF-26109',
      fullName: 'Farhan Akbar',
      phone: '+62 811-0000-2109',
      department: 'Finance',
      position: 'Finance Analyst',
      joinDate: new Date('2021-11-22'),
      address: 'Kompleks Bumi Parahyangan 16, Cimahi',
    },
    {
      email: 'intan.maharani@ruangkerja.test',
      employeeCode: 'WKF-26110',
      fullName: 'Intan Maharani',
      phone: '+62 811-0000-2110',
      department: 'Human Resources',
      position: 'Recruiter',
      joinDate: new Date('2022-04-07'),
      address: 'Jalan Padasuka Baru 42, Bandung',
    },
    {
      email: 'reza.kurniawan@ruangkerja.test',
      employeeCode: 'WKF-26111',
      fullName: 'Reza Kurniawan',
      phone: '+62 811-0000-2111',
      department: 'Engineering',
      position: 'QA Engineer',
      joinDate: new Date('2023-02-14'),
      address: 'Perumahan Karya Mandiri 8, Majalengka',
    },
    {
      email: 'sekar.ayuningtyas@ruangkerja.test',
      employeeCode: 'WKF-26112',
      fullName: 'Sekar Ayuningtyas',
      phone: '+62 811-0000-2112',
      department: 'Marketing',
      position: 'Content Writer',
      joinDate: new Date('2023-08-01'),
      address: 'Jalan Cibiru Hilir 14, Bandung',
    },
    {
      email: 'ilham.fauzan@ruangkerja.test',
      employeeCode: 'WKF-26113',
      fullName: 'Ilham Fauzan',
      phone: '+62 811-0000-2113',
      department: 'Design',
      position: 'Graphic Designer',
      joinDate: new Date('2022-12-05'),
      address: 'Kompleks Citra Wangi 5, Sumedang',
    },
    {
      email: 'citra.laksmi@ruangkerja.test',
      employeeCode: 'WKF-26114',
      fullName: 'Citra Laksmi',
      phone: '+62 811-0000-2114',
      department: 'Operations',
      position: 'Operations Staff',
      joinDate: new Date('2023-04-20'),
      address: 'Jalan Sukamaju Indah 27, Garut',
    },
    {
      email: 'bayu.prawira@ruangkerja.test',
      employeeCode: 'WKF-26115',
      fullName: 'Bayu Prawira',
      phone: '+62 811-0000-2115',
      department: 'Operations',
      position: 'Operations Manager',
      joinDate: new Date('2021-06-15'),
      address: 'Perumahan Bukit Sari 19, Tasikmalaya',
    },
  ];

  for (const emp of employeeData) {
    const user = await prisma.user.upsert({
      where: { email: emp.email },
      update: {},
      create: {
        email: emp.email,
        password: hashedPassword,
        role: Role.EMPLOYEE,
        isActive: true,
        employee: {
          create: {
            employeeCode: emp.employeeCode,
            fullName: emp.fullName,
            phone: emp.phone,
            department: emp.department,
            position: emp.position,
            joinDate: emp.joinDate,
            address: emp.address,
          },
        },
      },
      include: { employee: true },
    });
    console.log(`✅ Employee created: ${emp.fullName} (${emp.email})`);

    const checkInAt = buildCheckInTimestamp(workDate);
    const checkOutAt = buildCheckOutTimestamp(workDate);

    if (user.employee) {
      await prisma.attendance.upsert({
        where: {
          employeeId_workDate: {
            employeeId: user.employee.id,
            workDate,
          },
        },
        update: {},
        create: {
          employeeId: user.employee.id,
          workDate,
          checkInAt,
          photoCheckInUrl: `/uploads/attendance/checkin.jpg`,
          checkInNote: 'Absen masuk',
          checkOutAt,
          photoCheckOutUrl: `/uploads/attendance/checkout.jpg`,
          checkOutNote: 'Absen pulang',
        },
      });
      console.log(
        `   📅 Attendance seeded for ${emp.fullName} — in: ${checkInAt.toTimeString().slice(0, 5)}, out: ${checkOutAt.toTimeString().slice(0, 5)}`,
      );
    }
  }

  console.log('\n🎉 Seeding completed!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('HRD       : hrd@ruangkerja.test / password123');
  console.log('Employee  : [nama]@ruangkerja.test / password123  (15 akun)');
  console.log('Attendance: 1 hari × 15 karyawan = 15 records');
  console.log('Check-in  : 07:30 – 08:00');
  console.log('Check-out : 16:00 – 18:00');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

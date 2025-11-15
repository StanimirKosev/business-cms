import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const machineryCategories = [
  {
    "id": "cmh7cqn9f0000gzkwfr2j9j5e",
    "nameBg": "Верижни багери",
    "nameEn": "Tracked Excavators",
    "count": 9,
    "imageUrl": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    "order": 0,
    "createdAt": "2025-10-26T06:52:51.651Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqno90008gzkwee9k0s8u",
    "nameBg": "Колесни багери",
    "nameEn": "Wheeled Excavators",
    "count": 8,
    "imageUrl": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    "order": 1,
    "createdAt": "2025-10-26T06:52:52.185Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqo4s000fgzkw45qkzeil",
    "nameBg": "Мини багери",
    "nameEn": "Mini Excavators",
    "count": 3,
    "imageUrl": "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e5?w=800&q=80",
    "order": 2,
    "createdAt": "2025-10-26T06:52:52.780Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqnyk000cgzkw657f8fmd",
    "nameBg": "Телескопични товарачи",
    "nameEn": "Telescopic Loaders",
    "count": 2,
    "imageUrl": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "order": 3,
    "createdAt": "2025-10-26T06:52:52.556Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqofz000mgzkwxjk9cpnc",
    "nameBg": "Челни товарачи",
    "nameEn": "Front Loaders",
    "count": 5,
    "imageUrl": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    "order": 4,
    "createdAt": "2025-10-26T06:52:53.184Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "Валяци (вибрационни / пътни)",
    "nameEn": "Rollers (Vibratory / Road)",
    "count": 6,
    "imageUrl": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    "order": 5,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqor3000wgzkwiznx9ogd",
    "nameBg": "Пътна фреза",
    "nameEn": "Road Mill",
    "count": 1,
    "imageUrl": "https://images.unsplash.com/photo-1589395937772-510c8f1f623e?w=800&q=80",
    "order": 6,
    "createdAt": "2025-10-26T06:52:53.583Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqowe000ygzkwic1v1guy",
    "nameBg": "Асфалтополагачи",
    "nameEn": "Asphalt Pavers",
    "count": 2,
    "imageUrl": "https://images.unsplash.com/photo-1621544402532-90a61dc8ccd7?w=800&q=80",
    "order": 7,
    "createdAt": "2025-10-26T06:52:53.775Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqntc000agzkwyyrq3rk7",
    "nameBg": "Булдозери",
    "nameEn": "Bulldozers",
    "count": 1,
    "imageUrl": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    "order": 8,
    "createdAt": "2025-10-26T06:52:52.368Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "Товарни автомобили",
    "nameEn": "Cargo Trucks",
    "count": 16,
    "imageUrl": "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80",
    "order": 9,
    "createdAt": "2025-10-26T06:52:54.371Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  },
  {
    "id": "cmh7cqpn3001igzkwlbqqe0e3",
    "nameBg": "Друго оборудване",
    "nameEn": "Other Equipment",
    "count": 5,
    "imageUrl": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    "order": 10,
    "createdAt": "2025-10-26T06:52:54.735Z",
    "updatedAt": "2025-11-08T08:39:48.515Z"
  }
];

const machineryModels = [
  {
    "id": "cmh7cqn9g0001gzkw8vziv52j",
    "categoryId": "cmh7cqn9f0000gzkwfr2j9j5e",
    "nameBg": "JCB JS220 LC",
    "nameEn": "JCB JS220 LC",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:51.651Z",
    "updatedAt": "2025-10-26T06:52:51.651Z"
  },
  {
    "id": "cmh7cqn9g0002gzkw8v11ka7z",
    "categoryId": "cmh7cqn9f0000gzkwfr2j9j5e",
    "nameBg": "JCB JS160",
    "nameEn": "JCB JS160",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:51.651Z",
    "updatedAt": "2025-10-26T06:52:51.651Z"
  },
  {
    "id": "cmh7cqn9g0003gzkwixrdbizk",
    "categoryId": "cmh7cqn9f0000gzkwfr2j9j5e",
    "nameBg": "Volvo EC200 EL",
    "nameEn": "Volvo EC200 EL",
    "count": 1,
    "unit": "PIECES",
    "order": 3,
    "createdAt": "2025-10-26T06:52:51.651Z",
    "updatedAt": "2025-10-26T06:52:51.651Z"
  },
  {
    "id": "cmh7cqn9g0004gzkwrjezvjy1",
    "categoryId": "cmh7cqn9f0000gzkwfr2j9j5e",
    "nameBg": "JCB 86C серии",
    "nameEn": "JCB 86C series",
    "count": 5,
    "unit": "PIECES",
    "order": 4,
    "createdAt": "2025-10-26T06:52:51.651Z",
    "updatedAt": "2025-10-26T06:52:51.651Z"
  },
  {
    "id": "cmh7cqn9g0005gzkw53vemvn8",
    "categoryId": "cmh7cqn9f0000gzkwfr2j9j5e",
    "nameBg": "JCB 86C-1",
    "nameEn": "JCB 86C-1",
    "count": 1,
    "unit": "PIECES",
    "order": 5,
    "createdAt": "2025-10-26T06:52:51.651Z",
    "updatedAt": "2025-10-26T06:52:51.651Z"
  },
  {
    "id": "cmh7cqno90009gzkwuliqmxph",
    "categoryId": "cmh7cqno90008gzkwee9k0s8u",
    "nameBg": "JCB 3CX",
    "nameEn": "JCB 3CX",
    "count": 7,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:52.185Z",
    "updatedAt": "2025-10-26T06:52:52.185Z"
  },
  {
    "id": "cmh7cqntc000bgzkw6rla6i1n",
    "categoryId": "cmh7cqntc000agzkwyyrq3rk7",
    "nameBg": "Hitachi D180 LPG",
    "nameEn": "Hitachi D180 LPG",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:52.368Z",
    "updatedAt": "2025-10-26T06:52:52.368Z"
  },
  {
    "id": "cmh7cqnyk000dgzkw05nbxyyj",
    "categoryId": "cmh7cqnyk000cgzkw657f8fmd",
    "nameBg": "JCB 531-170",
    "nameEn": "JCB 531-170",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:52.556Z",
    "updatedAt": "2025-10-26T06:52:52.556Z"
  },
  {
    "id": "cmh7cqnyk000egzkw3codcumx",
    "categoryId": "cmh7cqnyk000cgzkw657f8fmd",
    "nameBg": "JCB 536-95",
    "nameEn": "JCB 536-95",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:52.556Z",
    "updatedAt": "2025-10-26T06:52:52.556Z"
  },
  {
    "id": "cmh7cqo4s000ggzkwhkinwcfa",
    "categoryId": "cmh7cqo4s000fgzkw45qkzeil",
    "nameBg": "JCB 8025",
    "nameEn": "JCB 8025",
    "count": 2,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:52.780Z",
    "updatedAt": "2025-10-26T06:52:52.780Z"
  },
  {
    "id": "cmh7cqo4s000hgzkwmd1i1nbm",
    "categoryId": "cmh7cqo4s000fgzkw45qkzeil",
    "nameBg": "Takeuchi TB016",
    "nameEn": "Takeuchi TB016",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:52.780Z",
    "updatedAt": "2025-10-26T06:52:52.780Z"
  },
  {
    "id": "cmh7cqofz000ngzkwxwx6xvwu",
    "categoryId": "cmh7cqofz000mgzkwxjk9cpnc",
    "nameBg": "Komatsu WA 65",
    "nameEn": "Komatsu WA 65",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:53.184Z",
    "updatedAt": "2025-10-26T06:52:53.184Z"
  },
  {
    "id": "cmh7cqofz000ogzkwijuh86r6",
    "categoryId": "cmh7cqofz000mgzkwxjk9cpnc",
    "nameBg": "JCB 406 WLS",
    "nameEn": "JCB 406 WLS",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:53.184Z",
    "updatedAt": "2025-10-26T06:52:53.184Z"
  },
  {
    "id": "cmh7cqol4000qgzkw1e3s0cw1",
    "categoryId": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "Dynapac CC 422",
    "nameEn": "Dynapac CC 422",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-10-26T06:52:53.368Z"
  },
  {
    "id": "cmh7cqol4000rgzkwqkav7cbn",
    "categoryId": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "JCB VM 75D",
    "nameEn": "JCB VM 75D",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-10-26T06:52:53.368Z"
  },
  {
    "id": "cmh7cqnhv0007gzkwaxuem5yk",
    "categoryId": "cmh7cqno90008gzkwee9k0s8u",
    "nameBg": "JCB JS175W",
    "nameEn": "JCB JS175W",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:51.956Z",
    "updatedAt": "2025-11-08T08:30:31.645Z"
  },
  {
    "id": "cmh7cqo9s000jgzkwzxra3rjh",
    "categoryId": "cmh7cqofz000mgzkwxjk9cpnc",
    "nameBg": "JCB 155SSL",
    "nameEn": "JCB 155SSL",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:52.961Z",
    "updatedAt": "2025-11-08T08:32:09.277Z"
  },
  {
    "id": "cmh7cqo9s000kgzkwnoz3mzdk",
    "categoryId": "cmh7cqofz000mgzkwxjk9cpnc",
    "nameBg": "BOBCAT T190",
    "nameEn": "BOBCAT T190",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:52.961Z",
    "updatedAt": "2025-11-08T08:32:09.277Z"
  },
  {
    "id": "cmh7cqo9s000lgzkwxcjupx1d",
    "categoryId": "cmh7cqofz000mgzkwxjk9cpnc",
    "nameBg": "CATERPILLAR 216b",
    "nameEn": "CATERPILLAR 216b",
    "count": 1,
    "unit": "PIECES",
    "order": 3,
    "createdAt": "2025-10-26T06:52:52.961Z",
    "updatedAt": "2025-11-08T08:32:09.277Z"
  },
  {
    "id": "cmh7cqol4000sgzkwemtnq03t",
    "categoryId": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "Dynapac CC-122",
    "nameEn": "Dynapac CC-122",
    "count": 1,
    "unit": "PIECES",
    "order": 3,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-10-26T06:52:53.368Z"
  },
  {
    "id": "cmh7cqol4000tgzkwsj9qukx7",
    "categoryId": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "JCB VMT 260-120",
    "nameEn": "JCB VMT 260-120",
    "count": 1,
    "unit": "PIECES",
    "order": 4,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-10-26T06:52:53.368Z"
  },
  {
    "id": "cmh7cqol4000ugzkwaavv4zqp",
    "categoryId": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "JCB CT 260-120",
    "nameEn": "JCB CT 260-120",
    "count": 1,
    "unit": "PIECES",
    "order": 5,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-10-26T06:52:53.368Z"
  },
  {
    "id": "cmh7cqol4000vgzkw06m1quxu",
    "categoryId": "cmh7cqol4000pgzkwfczl08ok",
    "nameBg": "JCB VMT 160-80",
    "nameEn": "JCB VMT 160-80",
    "count": 1,
    "unit": "PIECES",
    "order": 6,
    "createdAt": "2025-10-26T06:52:53.368Z",
    "updatedAt": "2025-10-26T06:52:53.368Z"
  },
  {
    "id": "cmh7cqor3000xgzkwh4a983ru",
    "categoryId": "cmh7cqor3000wgzkwiznx9ogd",
    "nameBg": "Wirtgen W120 F",
    "nameEn": "Wirtgen W120 F",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:53.583Z",
    "updatedAt": "2025-10-26T06:52:53.583Z"
  },
  {
    "id": "cmh7cqowe000zgzkwxcc6xv5m",
    "categoryId": "cmh7cqowe000ygzkwic1v1guy",
    "nameBg": "Vogele Super 1800-2",
    "nameEn": "Vogele Super 1800-2",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:53.775Z",
    "updatedAt": "2025-10-26T06:52:53.775Z"
  },
  {
    "id": "cmh7cqowe0010gzkwtwmce39b",
    "categoryId": "cmh7cqowe000ygzkwic1v1guy",
    "nameBg": "DF 135 C Svedala-Demag",
    "nameEn": "DF 135 C Svedala-Demag",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:53.775Z",
    "updatedAt": "2025-10-26T06:52:53.775Z"
  },
  {
    "id": "cmh7cqp1o0012gzkwvedlgue0",
    "categoryId": "cmh7cqpn3001igzkwlbqqe0e3",
    "nameBg": "Hydrog DG-1500",
    "nameEn": "Hydrog DG-1500",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:53.965Z",
    "updatedAt": "2025-11-08T08:36:25.249Z"
  },
  {
    "id": "cmh7cqpi2001ggzkwk8x9gw3z",
    "categoryId": "cmh7cqpn3001igzkwlbqqe0e3",
    "nameBg": "Wograndi Doka 1622",
    "nameEn": "Wograndi Doka 1622",
    "count": 1,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:54.554Z",
    "updatedAt": "2025-11-08T08:37:10.965Z"
  },
  {
    "id": "cmh7cqpi2001hgzkw585ji2fu",
    "categoryId": "cmh7cqpn3001igzkwlbqqe0e3",
    "nameBg": "Schwarzmueller TU 30 100",
    "nameEn": "Schwarzmueller TU 30 100",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:54.554Z",
    "updatedAt": "2025-11-08T08:37:10.965Z"
  },
  {
    "id": "cmh7cqpcz001cgzkw844gsco1",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "MAN TGL 8.150",
    "nameEn": "MAN TGL 8.150",
    "count": 4,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:54.371Z",
    "updatedAt": "2025-10-26T06:52:54.371Z"
  },
  {
    "id": "cmh7cqpcz001dgzkwd2tfseiq",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "MAN L2000",
    "nameEn": "MAN L2000",
    "count": 2,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:54.371Z",
    "updatedAt": "2025-10-26T06:52:54.371Z"
  },
  {
    "id": "cmh7cqpcz001egzkwx4mgqu20",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "MITSUBISHI CANTER 75",
    "nameEn": "MITSUBISHI CANTER 75",
    "count": 1,
    "unit": "PIECES",
    "order": 3,
    "createdAt": "2025-10-26T06:52:54.371Z",
    "updatedAt": "2025-10-26T06:52:54.371Z"
  },
  {
    "id": "cmh7cqpn3001jgzkwnaf3vtpz",
    "categoryId": "cmh7cqpn3001igzkwlbqqe0e3",
    "nameBg": "Електрически платформи (Alimak, Elektroesla) - 10 едноколонни + 5 двуколонни",
    "nameEn": "Electric platforms (Alimak, Elektroesla) - 10 single-column + 5 double-column",
    "count": 15,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:54.735Z",
    "updatedAt": "2025-10-26T06:52:54.735Z"
  },
  {
    "id": "cmh7cqpn3001kgzkwrsa1evck",
    "categoryId": "cmh7cqpn3001igzkwlbqqe0e3",
    "nameBg": "Строително скеле",
    "nameEn": "Construction scaffolding",
    "count": 15000,
    "unit": "SQUARE_METERS",
    "order": 2,
    "createdAt": "2025-10-26T06:52:54.735Z",
    "updatedAt": "2025-10-26T06:52:54.735Z"
  },
  {
    "id": "cmh7cqp6o0014gzkwrnycksqq",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "MAN TGS 35.400",
    "nameEn": "MAN TGS 35.400",
    "count": 2,
    "unit": "PIECES",
    "order": 1,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  },
  {
    "id": "cmh7cqp6o0015gzkwgo6no8j0",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "Scania G 410",
    "nameEn": "Scania G 410",
    "count": 1,
    "unit": "PIECES",
    "order": 2,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  },
  {
    "id": "cmh7cqp6o0016gzkwceh8lt69",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "Scania G 420",
    "nameEn": "Scania G 420",
    "count": 1,
    "unit": "PIECES",
    "order": 3,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  },
  {
    "id": "cmh7cqp6o0017gzkw3vki9j5a",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "IVECO",
    "nameEn": "IVECO",
    "count": 1,
    "unit": "PIECES",
    "order": 4,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  },
  {
    "id": "cmh7cqp6o0018gzkwetc0njcw",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "Scania R124",
    "nameEn": "Scania R124",
    "count": 2,
    "unit": "PIECES",
    "order": 5,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  },
  {
    "id": "cmh7cqp6o0019gzkw8hx5zobt",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "Scania P114GB",
    "nameEn": "Scania P114GB",
    "count": 1,
    "unit": "PIECES",
    "order": 6,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  },
  {
    "id": "cmh7cqp6o001agzkwzyatlzvb",
    "categoryId": "cmh7cqpcz001bgzkwa5iuitw3",
    "nameBg": "Scania 94",
    "nameEn": "Scania 94",
    "count": 1,
    "unit": "PIECES",
    "order": 7,
    "createdAt": "2025-10-26T06:52:54.144Z",
    "updatedAt": "2025-11-08T08:33:55.783Z"
  }
];

async function main() {
  console.log("🌱 Starting database seed...");

  for (const category of machineryCategories) {
    const existing = await prisma.machineryCategory.findFirst({
      where: { id: category.id },
    });
    if (!existing) {
      await prisma.machineryCategory.create({
        data: {
          id: category.id,
          nameBg: category.nameBg,
          nameEn: category.nameEn,
          count: category.count,
          imageUrl: category.imageUrl,
          order: category.order,
        },
      });
    }
  }
  console.log("✅ Created machinery categories");

  for (const model of machineryModels) {
    const existing = await prisma.machineryModel.findFirst({
      where: { id: model.id },
    });
    if (!existing) {
      await prisma.machineryModel.create({
        data: {
          id: model.id,
          categoryId: model.categoryId,
          nameBg: model.nameBg,
          nameEn: model.nameEn,
          count: model.count,
          unit: model.unit as any,
          order: model.order,
        },
      });
    }
  }
  console.log("✅ Created machinery models");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

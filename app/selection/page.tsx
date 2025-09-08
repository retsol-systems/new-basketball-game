"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface MerchantType {
  id: string
  type: string
  code: string
  img?: string
  name: string
  voucherName: string
  description: string
  voucherValue: string

}

export default function Home() {
  const router = useRouter();
  const [selectedMerchant, setSelectedMerchant] = useState<number | undefined>()
  const [merchantsList, setMerchantsList] = useState<MerchantType[]>(gcs)
  const [selectedList, setSelectedList] = useState<MerchantType[]>();
  const [didSelect, setDidSelect] = useState<boolean>(false);

  useEffect(() => {
  const accepted = sessionStorage.getItem("accepted");
  const fullName = sessionStorage.getItem("fullName");
  const storexNumber = sessionStorage.getItem("storexNumber");
  const score = sessionStorage.getItem("score");
  const storedList = sessionStorage.getItem("list");
  const selectCheck = sessionStorage.getItem("rewardSelected");

  if (!storedList) {
    const list = getRandomMerchant(merchantsList, 4);
    setSelectedList(list);
    sessionStorage.setItem("list", JSON.stringify(list));
  } else {
    setSelectedList(JSON.parse(storedList));
  }

  if (accepted && fullName && storexNumber) {
    console.log(accepted + fullName + storexNumber)
    // router.push("/assets/basketball/play.html");
  } else if (score && selectCheck) {
    router.push("reward");
  }
}, []);


  const getRandomMerchant =(list: MerchantType[], count: number) => {
  return [...list] // copy to avoid mutating original
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, count); // take N
}
//   const playAgain = () => {
//     sessionStorage.clear();
//     router.push("/");
//   };

const selectReward = (selected:number) => {
  if (selected) {
    const selectedMerchantObj = merchantsList.find(m => m.id === selected.toString());
    if (selectedMerchantObj) {
      sessionStorage.setItem("rewardSelected", JSON.stringify(selectedMerchantObj));
    }
    setDidSelect(true);
    console.log(selected)
    console.log(merchantsList.length)

  }
    // router.push("/reward");
  

}
  return (
<div className="font-sans flex flex-col items-center justify-center w-full min-h-screen bg-[#ffb932] p-4">
  
  {didSelect ?<> <SelectedReward /> </> :<><main className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center w-full max-w-6xl">
    {/* Left section */}
    <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 bg-white/60 rounded-md shadow-md overflow-y-auto max-h-screen">
      {/* Image */}
      <div className="flex justify-center items-center w-full pt-10">
           <span className="font-bold  text-2xl ">
           Select Reward
            </span>
      </div>

      <div className="flex flex-col justify-center items-center w-full p-10 text-center gap-4">
      {selectedList?.map((merchant: MerchantType) => (
    <div
      className="bg-white/70 p-2 rounded-xl shadow-xl grid grid-flow-col grid-rows-3 gap-4 w-full"
      key={merchant.id}
      onClick={()=>{selectReward(parseInt(merchant.id))}}
    >
      <div className="row-span-3 w-24 px-4"> <img
              alt={merchant.voucherName}
              src={merchant.img}
              className="w-24 h-24 pt-2 object-contain"
            /></div>
      <div className="col-span-2 "><span>{merchant.name}</span></div>
      <div className="col-span-2 font-bold text-md text-black"><span>{merchant.code}</span></div>
      <div className="col-span-2 truncate text-sm"><span>{merchant.voucherValue} {merchant.voucherName}</span></div>
    </div>
  ))}
      </div>
    </div>
  </main></>}
</div>
  );
}



function SelectedReward(){
  const router = useRouter();
    const selectedReward = sessionStorage.getItem("rewardSelected");
    console.log(selectedReward)
    const [merchant, setMerchant] = useState<MerchantType | undefined>(() => {
        if (selectedReward) {
            try {
                return JSON.parse(selectedReward) as MerchantType;
            } catch {
                return undefined;
            }
        }
        return undefined;
    });

    const goReward = () => {

        router.push('/reward');
    }

      return (
<div className="font-sans flex flex-col items-center justify-center w-full min-h-screen bg-[#ffb932] p-4">
  <main className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center w-full max-w-6xl">
    {/* Left section */}
    <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 bg-white/60 rounded-md shadow-md overflow-y-auto max-h-screen">
      {/* Image */}
      <div className="flex justify-center items-center w-full pt-10">
           <span className="font-bold  text-2xl ">
           Selected Reward
            </span>
      </div>

      <div className="flex flex-col justify-center items-center w-full p-10 text-center gap-4">
      <div
      className="bg-white/70 p-2 rounded-xl shadow-xl grid grid-flow-col grid-rows-3 gap-4 w-full"
      key={merchant?.id}
    //   onClick={()=>{selectReward(parseInt(merchant.id))}}
    >
      <div className="row-span-3 w-24 px-4"> <img
              alt={merchant?.voucherName}
              src={merchant?.img}
              className="w-24 h-24 pt-2 object-contain"
            /></div>
      <div className="col-span-2 "><span>{merchant?.name}</span></div>
      <div className="col-span-2 font-bold text-md text-black"><span>{merchant?.code}</span></div>
      <div className="col-span-2 truncate text-sm"><span>{merchant?.voucherValue} {merchant?.voucherName}</span></div>
    </div>
     <div className="w-full ">
     <button
              onClick={goReward}
              className="bg-orange-600 p-4 w-full rounded-lg text-white font-semibold "
            >
              Submit
            </button>
    </div>
      </div>
    </div>
   
  </main>
</div>
  );
}

const gcs = [
  {
    img: 'https://1000logos.net/wp-content/uploads/2021/05/Jollibee-logo-500x281.png',
    type: 'Jollibee',
    id: '1',
    code: 'JOLLI100',
    name: 'Jollibee Foods Corporation',
    voucherName: 'Jollibee Voucher',
    voucherValue: '₱100',
    description: 'A popular Filipino fast-food chain known for Chickenjoy, Jolly Spaghetti, and burgers.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo-500x281.png',
    type: 'McDonalds',
    id: '2',
    code: 'MCDO150',
    name: "McDonald's Corporation",
    voucherName: 'McDonald’s Voucher',
    voucherValue: '₱150',
    description: 'One of the largest global fast-food chains, famous for burgers, fries, and McNuggets.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2016/12/Starbucks-Logo-500x417.png',
    type: 'Starbucks',
    id: '3',
    code: 'STAR200',
    name: 'Starbucks Coffee Company',
    voucherName: 'Starbucks eGift',
    voucherValue: '₱200',
    description: 'International coffeehouse chain offering premium coffee, beverages, and pastries.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo-500x281.png',
    type: 'KFC',
    id: '4',
    code: 'KFC120',
    name: 'Kentucky Fried Chicken',
    voucherName: 'KFC Voucher',
    voucherValue: '₱120',
    description: 'Fast-food chain specializing in fried chicken with secret herbs and spices.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/08/Dunkin-Donuts-Logo-500x209.png',
    type: "Dunkin'",
    id: '5',
    code: 'DUNKIN80',
    name: 'Dunkin’ Donuts',
    voucherName: 'Dunkin’ Voucher',
    voucherValue: '₱80',
    description: 'Known for donuts, coffee, and quick breakfast options.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2022/08/Grab-Logo-500x281.png',
    type: 'Grab',
    id: '6',
    code: 'GRAB100',
    name: 'Grab Holdings Inc.',
    voucherName: 'Grab Voucher',
    voucherValue: '₱100',
    description: 'Super app offering ride-hailing, food delivery, and digital payments across Southeast Asia.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2022/01/Lazada-Logo-500x281.jpg',
    type: 'Lazada',
    id: '7',
    code: 'LAZ200',
    name: 'Lazada Group',
    voucherName: 'Lazada Voucher',
    voucherValue: '₱200',
    description: 'E-commerce platform in Southeast Asia offering a wide range of products online.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2021/02/Shopee-logo-500x328.jpg',
    type: 'Shopee',
    id: '8',
    code: 'SHOP100',
    name: 'Shopee Pte. Ltd.',
    voucherName: 'Shopee Voucher',
    voucherValue: '₱100',
    description: 'Mobile-first e-commerce platform known for flash sales and free shipping promos.',
  },
  {
    img: '/assets/images/Maya-Logo-1280x372.png',
    type: 'Maya',
    id: '9',
    code: 'MAYA150',
    name: 'Maya Bank, Inc.',
    voucherName: 'Maya Voucher',
    voucherValue: '₱150',
    description: 'Philippines-based digital bank and e-wallet for payments and transfers.',
  },
  {
    img: '/assets/images/GCash-Logo-700x618.png',
    type: 'GCash',
    id: '10',
    code: 'GCASH200',
    name: 'GCash (Mynt)',
    voucherName: 'GCash Voucher',
    voucherValue: '₱200',
    description: 'Leading Philippine e-wallet for cashless payments, bills, and transfers.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2022/08/Grab-Logo-500x281.png',
    type: 'GrabFood',
    id: '11',
    code: 'GRABFOOD120',
    name: 'GrabFood',
    voucherName: 'GrabFood Voucher',
    voucherValue: '₱120',
    description: 'Grab’s food delivery service connecting customers with nearby restaurants.',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/06/Unilever-Logo-768x582.png',
    type: 'Unilever',
    id: '12',
    code: 'UNILEVER300',
    name: 'Unilever PLC',
    voucherName: 'Unilever Voucher',
    voucherValue: '₱300',
    description: 'Global consumer goods company producing food, beverages, cleaning agents, and personal care products.',
  },
  {
    img: '/assets/images/Puregold-Logo-512x512.png',
    type: 'Puregold',
    id: '13',
    code: 'PUREGOLD150',
    name: 'Puregold Price Club, Inc.',
    voucherName: 'Puregold Voucher',
    voucherValue: '₱150',
    description: 'Philippine supermarket chain offering groceries and household essentials.',
  },
]

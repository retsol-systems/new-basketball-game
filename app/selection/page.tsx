"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface MerchantType {
  id: string;
  type: string;
  code: string;
  img?: string;
  name: string;
  voucherName: string;
  description: string;
  voucherValue: string;
}

export default function Home() {
  const router = useRouter();
  const [selectedMerchant, setSelectedMerchant] = useState<
    number | undefined
  >();
  const [merchantsList, setMerchantsList] = useState<MerchantType[]>(gcs);
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
      console.log(accepted + fullName + storexNumber);
      // router.push("/assets/basketball/play.html");
    } else if (score && selectCheck) {
      router.push("reward");
    }
  }, []);

  const getRandomMerchant = (list: MerchantType[], count: number) => {
    return [...list] // copy to avoid mutating original
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, count); // take N
  };
  //   const playAgain = () => {
  //     sessionStorage.clear();
  //     router.push("/");
  //   };

  const selectReward = (selected: number) => {
    if (selected) {
      const selectedMerchantObj = merchantsList.find(
        (m) => m.id === selected.toString()
      );
      if (selectedMerchantObj) {
        sessionStorage.setItem(
          "rewardSelected",
          JSON.stringify(selectedMerchantObj)
        );
      }
      setDidSelect(true);
      console.log(selected);
      console.log(merchantsList.length);
    }
    // router.push("/reward");
  };
  return (
    <div className="font-sans flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-300 to-gray-200 p-4">
      {didSelect ? (
        <>
          {" "}
          <SelectedReward />{" "}
        </>
      ) : (
        <>
          <main className="flex min-h-screen items-center justify-center  md:p-8 ">
            <div className="w-full max-w-lg md:max-w-3xl rounded-xl bg-white/20 backdrop-blur-md  p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                  Select Your Reward
                </h1>
                <p className="mt-2 text-gray-500">
                  Choose from a variety of exclusive vouchers.
                </p>
              </div>

              {/* Rewards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedList?.map((merchant: MerchantType) => (
                  <div
                    className="bg-white rounded-2xl  transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ring-2 ring-transparent hover:ring-blue-500"
                    key={merchant.id}
                    onClick={() => selectReward(parseInt(merchant.id))}
                  >
                    <div className="flex p-4 items-center gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg p-2 flex items-center justify-center overflow-hidden">
                        <img
                          alt={merchant.voucherName}
                          src={merchant.img}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col w-full ">
                        <h2 className="text-base font-bold text-gray-900 ">
                          {merchant.name}
                        </h2>
                        <div className="scratch-card-texture w-3/4 h-6 bg-gradient-to-br from-blue-300 to-gray-200 rounded-lg relative overflow-hidden">
                          <div className=" inset-0 bg-gray-500 rounded-lg"></div>
                          <div className=" inset-0 flex items-center justify-center"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5 truncate">
                          {merchant.voucherValue} {merchant.voucherName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

function SelectedReward() {
  const router = useRouter();
      const fullName = sessionStorage.getItem("fullName");
    const getCustomFormattedDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are 0-based
    const day = today.getDate();
    const year = today.getFullYear();
    let hours = today.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = today.getMinutes();
  
    return `${month}${day}${year}${hours}${minutes}`;
  };
 const addLogs = async (
  appId: string,
  description: string,
  customer: string,
  control: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
       `${process.env.NEXT_PUBLIC_API_URL}/create/logs`,
      {
        appId,
        rewardDescription: description,
        customer,
        controlNo: control
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return true;   // success
  } catch (error) {
    console.error("Error creating logs:", error);
    return false;  // error happened
  }
};
  const selectedReward = sessionStorage.getItem("rewardSelected");
  console.log(selectedReward);
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

  const goReward = async () => {
      const controlNumber = getCustomFormattedDate().toString() + "-" + (merchant?.voucherName ?? "");
    const result = await addLogs("Cmiqv9a54000304lbd8dv58xb", merchant?.description ?? "", fullName ?? "", controlNumber);
    router.push("/reward");
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="flex flex-col w-full max-w-lg bg-white/20 rounded-3xl shadow-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Selected Reward
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Your choice is finalized.
          </p>
        </div>

        {/* Selected Reward Card */}
        <div className="relative bg-blue-600/20 rounded-2xl shadow-lg p-4 flex items-center space-x-4 border border-gray-200">
          {/* Image */}
          <div className="flex-shrink-0 w-24 h-24 p-2">
            <img
              alt={merchant?.voucherName}
              src={merchant?.img}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {merchant?.name}
            </h2>
            <p className="text-sm font-semibold text-blue-600 mt-1">
              {merchant?.code}
            </p>
            <p className="text-sm text-gray-500 mt-0.5 truncate">
              {merchant?.voucherValue} {merchant?.voucherName}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={goReward}
            className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg
                           transition-all duration-300 hover:bg-blue-700 hover:shadow-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

const gcs = [
  {
    img: "https://1000logos.net/wp-content/uploads/2021/05/Jollibee-logo-500x281.png",
    type: "Jollibee",
    id: "1",
    code: "JOLLI100",
    name: "Jollibee Foods Corporation",
    voucherName: "Jollibee Voucher",
    voucherValue: "₱100",
    description:
      "A popular Filipino fast-food chain known for Chickenjoy, Jolly Spaghetti, and burgers.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo-500x281.png",
    type: "McDonalds",
    id: "2",
    code: "MCDO150",
    name: "McDonald's Corporation",
    voucherName: "McDonald’s Voucher",
    voucherValue: "₱150",
    description:
      "One of the largest global fast-food chains, famous for burgers, fries, and McNuggets.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2016/12/Starbucks-Logo-500x417.png",
    type: "Starbucks",
    id: "3",
    code: "STAR200",
    name: "Starbucks Coffee Company",
    voucherName: "Starbucks eGift",
    voucherValue: "₱200",
    description:
      "International coffeehouse chain offering premium coffee, beverages, and pastries.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo-500x281.png",
    type: "KFC",
    id: "4",
    code: "KFC120",
    name: "Kentucky Fried Chicken",
    voucherName: "KFC Voucher",
    voucherValue: "₱120",
    description:
      "Fast-food chain specializing in fried chicken with secret herbs and spices.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2017/08/Dunkin-Donuts-Logo-500x209.png",
    type: "Dunkin'",
    id: "5",
    code: "DUNKIN80",
    name: "Dunkin’ Donuts",
    voucherName: "Dunkin’ Voucher",
    voucherValue: "₱80",
    description: "Known for donuts, coffee, and quick breakfast options.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2022/08/Grab-Logo-500x281.png",
    type: "Grab",
    id: "6",
    code: "GRAB100",
    name: "Grab Holdings Inc.",
    voucherName: "Grab Voucher",
    voucherValue: "₱100",
    description:
      "Super app offering ride-hailing, food delivery, and digital payments across Southeast Asia.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2022/01/Lazada-Logo-500x281.jpg",
    type: "Lazada",
    id: "7",
    code: "LAZ200",
    name: "Lazada Group",
    voucherName: "Lazada Voucher",
    voucherValue: "₱200",
    description:
      "E-commerce platform in Southeast Asia offering a wide range of products online.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2021/02/Shopee-logo-500x328.jpg",
    type: "Shopee",
    id: "8",
    code: "SHOP100",
    name: "Shopee Pte. Ltd.",
    voucherName: "Shopee Voucher",
    voucherValue: "₱100",
    description:
      "Mobile-first e-commerce platform known for flash sales and free shipping promos.",
  },
  {
    img: "/assets/images/Maya-Logo-1280x372.png",
    type: "Maya",
    id: "9",
    code: "MAYA150",
    name: "Maya Bank, Inc.",
    voucherName: "Maya Voucher",
    voucherValue: "₱150",
    description:
      "Philippines-based digital bank and e-wallet for payments and transfers.",
  },
  {
    img: "/assets/images/GCash-Logo-700x618.png",
    type: "GCash",
    id: "10",
    code: "GCASH200",
    name: "GCash (Mynt)",
    voucherName: "GCash Voucher",
    voucherValue: "₱200",
    description:
      "Leading Philippine e-wallet for cashless payments, bills, and transfers.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2022/08/Grab-Logo-500x281.png",
    type: "GrabFood",
    id: "11",
    code: "GRABFOOD120",
    name: "GrabFood",
    voucherName: "GrabFood Voucher",
    voucherValue: "₱120",
    description:
      "Grab’s food delivery service connecting customers with nearby restaurants.",
  },
  {
    img: "https://1000logos.net/wp-content/uploads/2017/06/Unilever-Logo-768x582.png",
    type: "Unilever",
    id: "12",
    code: "UNILEVER300",
    name: "Unilever PLC",
    voucherName: "Unilever Voucher",
    voucherValue: "₱300",
    description:
      "Global consumer goods company producing food, beverages, cleaning agents, and personal care products.",
  },
  {
    img: "/assets/images/Puregold-Logo-512x512.png",
    type: "Puregold",
    id: "13",
    code: "PUREGOLD150",
    name: "Puregold Price Club, Inc.",
    voucherName: "Puregold Voucher",
    voucherValue: "₱150",
    description:
      "Philippine supermarket chain offering groceries and household essentials.",
  },
];

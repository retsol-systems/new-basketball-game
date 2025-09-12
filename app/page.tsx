"use client";

import React, { useEffect, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import axios from "axios";

type FormValues = {
  fullName: string;
  // mobileNumber: string;
  emailAddress: string;
  storexNumber: string;
  accepted: boolean;
  brand_newsletter: boolean;
  ulp_newsletter: boolean;
};

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormValues>({
    fullName: "",
    // mobileNumber: "",
    storexNumber:"",
    emailAddress: "",
    accepted: false,
    brand_newsletter: false,
    ulp_newsletter: false,
  });

  type FormErrors = {
    fullName?: string;
    // mobileNumber?: string;
    storexNumber?: string;
    emailAddress?: string;
    accepted?: string;
    brand_newsletter?: string;
    ulp_newsletter?: string;
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length > 70) {
      newErrors.fullName = "Full Name must be less than 70 characters";
    }


    // if (!formData.mobileNumber.match(/^\d{11}$/)) {
    //   newErrors.mobileNumber = "Invalid Mobile Number (format: +63XXXXXXXXXX)";
    // }

    if(formData.storexNumber.length > 13){
      newErrors.storexNumber = "Invalid Account Number";
    }

    if (
      formData.emailAddress &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)
    ) {
      newErrors.emailAddress = "Invalid Email Address";
    }

    if (!formData.accepted) {
      newErrors.accepted = "You must confirm you are 18+";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      insertData();
    }
    // console.log("Form submitted:", formData);
    //  router.push('/assets/basketball/play.html')

  };
  const insertData = async () => {
    if (formData !== undefined) {
      let fullName = formData.fullName
      let storexNumber = formData.storexNumber
      // var mobileNumber = formData.mobileNumber.replace(/\s/g, '')
      let emailAddress = formData.emailAddress !== undefined ? formData.emailAddress : "N/A"
      let brandNewsletter = formData.brand_newsletter ? true : false
      let ulpNewsletter = formData.ulp_newsletter ? true : false

      try {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            // mobileNumber: mobileNumber,
            storexNumber: storexNumber,
            emailAddress: emailAddress,
            brand_Newsletter: brandNewsletter,
            ulp_Newsletter: ulpNewsletter
          }),
        })
          .then((res) => res.json())
          // .then((data) => {
          //     console.log("Score update response:", data);
          // })
          .then(result => {
            console.log(result)
            sessionStorage.setItem("accepted", formData.accepted ? "true" : "false")
            sessionStorage.setItem("brand_newsletter", brandNewsletter ? "true" : "false")
            sessionStorage.setItem("ulp_newsletter", ulpNewsletter ? "true" : "false")
            sessionStorage.setItem("fullName", fullName)
            // sessionStorage.setItem("mobileNumber", mobileNumber)
            sessionStorage.setItem("storexNumber", storexNumber);
            sessionStorage.setItem("emailAddress", emailAddress)
            sessionStorage.setItem("userId", result.id)
          }).then(() => {
            router.push('/assets/basketball/play.html')
          })
          .catch((err) => {
            console.error("Error inserting data:", err);
          });

      }

      catch (e) {
        console.log(e);
      }
    }
  };
   
  
  return (
    <div className="font-sans flex flex-col items-center justify-center w-full min-h-screen bg-[#549ea0] p-4 overflow-hidden">
      <main className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center w-full max-w-6xl">
        {/* Left section */}
        <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image */}
          <div className="flex justify-center items-center w-full p-2">
            <img
              alt="basketball-hoop"
              src="/assets/images/basketball-hoop.png"
              className="max-w-full max-h-64 pt-2 object-contain"
            />
          </div>

          <div className=" w-full p-2 h-3/5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mx-auto p-4 bg-white  rounded-lg"
            >
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Juan Dela Cruz"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm">{errors.fullName}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col">
                <label className="font-medium">Account Number</label>
<input
  type="text"
  name="storexNumber"
  value={formData.storexNumber}
  onChange={handleChange}
  minLength={13}
  maxLength={13}
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="xxxxxxxxxxxxx"
  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
/>
                {errors.storexNumber && (
                  <span className="text-red-500 text-sm">{errors.storexNumber}</span>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label className="font-medium">Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder="juan.delacruz@gmail.com"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.emailAddress && (
                  <span className="text-red-500 text-sm">{errors.emailAddress}</span>
                )}
              </div>

              {/* Checkboxes */}
          
              {/* Checkboxes */}
              <label className="text-sm">
                <input
                  type="checkbox"
                  name="accepted"
                  checked={formData.accepted}
                  onChange={handleChange}
                  className="mr-2"
                />
                I confirm that I am 18 years old
              </label>
              {errors.accepted && (
                <span className="text-red-500 text-sm">{errors.accepted}</span>
              )}

              <label className="text-sm">
                <input
                  type="checkbox"
                  name="brand_newsletter"
                  checked={formData.brand_newsletter}
                  onChange={handleChange}
                  className="mr-2"
                />
                Sign me up to receive exciting news and offers from Rexona
              </label>
              <label className="text-sm">
                <input
                  type="checkbox"
                  name="ulp_newsletter"
                  checked={formData.ulp_newsletter}
                  onChange={handleChange}
                  className="mr-2"
                />
                Sign me up to receive exciting news and offers from other Unilever brands
              </label>

              {errorMessage && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
              )}

              <p className="text-xs text-justify text-gray-600">
                <i>
                  Please read our{" "}
                  <a
                    className="text-blue-600 underline"
                    href="https://www.unilevernotices.com/philippines/english/privacy-notice/notice.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Notice
                  </a>{" "}
                  to understand how we use your personal data. For any questions or concerns on
                  the use of your personal data, please contact Unilever Philippines, Inc. at{" "}
                  <a href="mailto:privacy.ph@unilever.com">privacy.ph@unilever.com</a>, 02-588-8800 or
                  toll free at 1-800-105647258.
                </i>
              </p>

              <button
                type="submit"
                className="mt-2 py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
             
      </main>

    </div>
  );
}

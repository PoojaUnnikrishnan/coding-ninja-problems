import React, { useState, useEffect } from "react";
import {
  QrCodeIcon,
  ArrowDownIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import { Button } from "./Button";
import QRCode from "qrcode";

export const QrCodeCard = () => {
  const [submit, setIsSubmit] = useState(false);
  const [link, setLink] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (submit) {
      setLoading(true);
      QRCode.toDataURL(link)
        .then((url) => {
          setDataUrl(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error generating QR code", error);
          setError("Failed to generate QR code. Please try again.");
          setLoading(false);
          setIsSubmit(false);
        });
    }
  }, [submit, link]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!link) {
      setError("Enter The Url");
      return;
    }
    setIsSubmit(true);
  };

  const handleInput = (e) => {
    setLink(e.target.value);
  };

  const handleClear = () => {
    setIsSubmit(false);
    setLink("");
    setDataUrl("");
  };

  return (
    <div className="flex flex-col relative w-[400px] p-[1rem] rounded-xl bg-white">
      <div className="relative w-full -mt-10 rounded-xl bg-[#F12259] p-4">
        {submit ? (
          loading ? (
            <p className="text-white">Generating QR code...</p>
          ) : (
            <div className="flex justify-center">
              <img src={dataUrl} alt="qr-code" className="w-full h-full object-fill" />
            </div>
          )
        ) : (
          <h1 className="font-bold text-white">Generate your QR</h1>
        )}
      </div>
      <form className="flex flex-col my-5 gap-5" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a valid URL"
          value={link}
          className="p-2 rounded-xl border-none outline outline-[#d5d5d5]"
          onInput={handleInput}
          
        />
        {error && (
          <div className="mt-2 mb-1 border border-red-500 flex justify-start p-2 rounded-xl gap-2 text-red-500">
            <InformationCircleIcon className="w-6 h-6 text-red-500" />
            {error}
          </div>
        )}
        {submit ? (
          <div className="flex gap-2 border justify-center">
            <button
              type="button"
              className="px-5 py-[10px] bg-[#616161] rounded-xl border-none text-white font-bold flex items-center gap-2"
              onClick={handleClear}
            >
              <XMarkIcon className="w-6 h-6" /> Clear
            </button>
            <Button>
              <a
                download="qrCode.png"
                href={dataUrl}
                className="w-full flex items-center gap-2"
              >
                <ArrowDownIcon className="w-6 h-6" /> Download
              </a>
            </Button>
          </div>
        ) : (
          <Button type="submit">
            <QrCodeIcon className="w-8 h-8" />
            Generate
          </Button>
        )}
      </form>
    </div>
  );
};

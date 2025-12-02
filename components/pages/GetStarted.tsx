// 'use client';

// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Download, ArrowRight, ArrowUp, ArrowLeft } from 'lucide-react';
// import Link from 'next/link';

// export const GetStarted: React.FC = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const slides = [
//     {
//       title: 'Connect with your city',
//       image: 'https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     },
//     {
//       title: 'Share your moments',
//       image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     },
//     {
//       title: 'Build communities',
//       image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
//     },
//   ];

//   const handleNext = () => {
//     setActiveSlide((prev) => (prev + 1) % slides.length);
//   };

//   const handlePrev = () => {
//     setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//       <div className="hidden md:block">
//         <div className="grid grid-cols-2 gap-0 min-h-screen">
//           <div className="flex flex-col justify-between p-12 lg:p-16">
//             <div>
//               <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Community App</h2>
//               <p className="text-blue-200">Local connections</p>
//             </div>

//             <div className="space-y-8">
//               <div>
//                 <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                   AI social network for counties
//                 </h1>
//                 <p className="text-blue-100 text-lg lg:text-xl max-w-md leading-relaxed">
//                   Connect locally, engage meaningfully, and discover your community. Share what matters and build lasting relationships.
//                 </p>
//               </div>

//               <div className="space-y-3 max-w-md">
//                 <Link href='/register/account-type' className="w-full bg-white hover:bg-gray-100 text-slate-900 rounded-full py-2 text-lg font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2">
//                   <ArrowLeft className="w-5 h-5" />
//                   Get started
//                 </Link>

//                 <Link
//                   href="/login"
//                   className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full py-2 text-lg font-semibold transition-all flex items-center justify-center gap-2"
//                 >
//                   I already have an account
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>

//               <div className="flex items-center justify-center gap-6 pt-4">
//                 <button
//                   onClick={handlePrev}
//                   className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center text-white"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>

//                 <div className="flex justify-center gap-2">
//                   {slides.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveSlide(index)}
//                       className={`h-2 rounded-full transition-all duration-300 ${
//                         index === activeSlide
//                           ? 'w-8 bg-white'
//                           : 'w-2 bg-white/40 hover:bg-white/60'
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <button
//                   onClick={handleNext}
//                   className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center text-white"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-start gap-4 text-white/60 text-sm">
//               <a href="#" className="hover:text-white transition-colors">Privacy</a>
//               <span>•</span>
//               <a href="#" className="hover:text-white transition-colors">Terms</a>
//               <span>•</span>
//               <a href="#" className="hover:text-white transition-colors">Contact</a>
//             </div>
//           </div>

//           <div className="relative overflow-hidden">
//             <div className="relative h-full w-full">
//               {slides.map((slide, index) => {
//                 const isActive = index === activeSlide;
//                 const isNext = index === (activeSlide + 1) % slides.length;
//                 const isPrev = index === (activeSlide - 1 + slides.length) % slides.length;

//                 let position = 'translate-x-full opacity-0';
//                 let zIndex = 0;

//                 if (isActive) {
//                   position = 'translate-x-0 opacity-100';
//                   zIndex = 30;
//                 } else if (isNext) {
//                   position = 'translate-x-full opacity-0';
//                   zIndex = 20;
//                 } else if (isPrev) {
//                   position = '-translate-x-full opacity-0';
//                   zIndex = 10;
//                 }

//                 return (
//                   <div
//                     key={index}
//                     className={`absolute inset-0 transition-all duration-700 ease-out ${position}`}
//                     style={{ zIndex }}
//                   >
//                     <img
//                       src={slide.image}
//                       alt={slide.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-900/80" />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="absolute inset-0 flex flex-col justify-between p-12 lg:p-16 pointer-events-none">
//               <div className="text-right text-white">
//                 <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
//                   {slides[activeSlide].title}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="md:hidden flex flex-col min-h-screen">
//         <div className="flex-1 flex flex-col items-center justify-between px-6 py-12">
//           <div className="text-white">
//             <h2 className="text-xl font-bold mb-2">Community App</h2>
//             <p className="text-sm text-blue-200">Local connections</p>
//           </div>

//           <div className="w-full max-w-lg mx-auto relative">
//             <div className="relative h-96 mb-8 perspective">
//               {slides.map((slide, index) => {
//                 const isActive = index === activeSlide;
//                 const isNext = index === (activeSlide + 1) % slides.length;
//                 const isPrev = index === (activeSlide - 1 + slides.length) % slides.length;

//                 let position = 'translate-x-full opacity-0';
//                 let zIndex = 0;

//                 if (isActive) {
//                   position = 'translate-x-0 opacity-100';
//                   zIndex = 30;
//                 } else if (isNext) {
//                   position = 'translate-x-full opacity-0';
//                   zIndex = 20;
//                 } else if (isPrev) {
//                   position = '-translate-x-full opacity-0';
//                   zIndex = 10;
//                 }

//                 return (
//                   <div
//                     key={index}
//                     className={`absolute inset-0 transition-all duration-500 ease-out ${position}`}
//                     style={{ zIndex }}
//                   >
//                     <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-blue-600">
//                       <img
//                         src={slide.image}
//                         alt={slide.title}
//                         className="w-full h-full object-cover opacity-90"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />

//                       <div className="absolute inset-0 flex flex-col justify-between p-6">
//                         <div className="text-right text-white">
//                           <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
//                             Featured
//                           </div>
//                         </div>

//                         <div>
//                           <h3 className="text-white text-3xl font-bold mb-4">{slide.title}</h3>
//                           <p className="text-blue-100 text-sm max-w-xs">
//                             Connect with people in your area and discover local events and communities.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-center gap-2 mb-8">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveSlide(index)}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     index === activeSlide
//                       ? 'w-8 bg-white'
//                       : 'w-1.5 bg-white/40 hover:bg-white/60'
//                   }`}
//                 />
//               ))}
//             </div>

//             <div className="flex justify-between items-center gap-4">
//               <button
//                 onClick={handlePrev}
//                 className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center text-white"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

//               <button
//                 onClick={handleNext}
//                 className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center text-white"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <div className="w-full max-w-sm space-y-4 mt-12">
//             <div className="text-center text-white mb-6">
//               <h1 className="text-5xl font-bold mb-3">AI social network for counties</h1>
//               <p className="text-blue-100 text-lg">
//                 Connect locally, engage meaningfully, and discover your community.
//               </p>
//             </div>

//             <Link href='/account-type' className="w-full bg-white hover:bg-gray-100 text-slate-900 rounded-full py-2 text-lg font-bold transition-all hover:shadow-lg">
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Get started
//             </Link>

//             <Link
//               href="/login"
//               className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full py-2 text-lg font-semibold transition-all"
//             >
//               I already have an account
//             </Link>
//           </div>

//           <div className="mt-12 text-center">
//             <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
//               <a href="#" className="hover:text-white transition-colors">Privacy</a>
//               <span>•</span>
//               <a href="#" className="hover:text-white transition-colors">Terms</a>
//               <span>•</span>
//               <a href="#" className="hover:text-white transition-colors">Contact</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };






'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Play, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// import userImage from '../../assets/images/phones.png';
import userImage from '../../assets/images/slide 1.jpg';
import playstore from '../../assets/images/play_store.webp';
import applestore from '../../assets/images/apple_store.webp';
import 'animate.css';
import AuthPageWrapper from '../auth/AuthPageWrapper';


export const GetStarted: React.FC = () => {
    const textArray = ["Counties", "Cities", "Communities"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const swiperRef = useRef(null); // Reference to Swiper instance
  const intervalDelay = 5000; 

useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Reset text animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % textArray.length;
          if (swiperRef.current) {
            swiperRef.current.slideTo(nextIndex); // Move Swiper to the next slide
          }
          return nextIndex;
        });
        setAnimate(true); // Restart text animation
      }, 50); // Small delay to reset animation
    }, intervalDelay);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [textArray.length]);
  return (
    // <AuthPageWrapper>
    <div className="min-h-screen custom-scroll bg-gradient-to-r from-[#002760] via-[#012C5F] to-[#040B1B] text-white">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-0 min-h-screen">
          {/* Left Column */}
          <div className="flex flex-col justify-between pl-12 pr-4 md:pl-16 md:pr-6 py-12 lg:py-16">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">C Cities App</h2>
              <p className="text-sm">AI social network for counties</p>
            </div>

            <div className="space-y-12">
              <div>
                <h1 className="text-5xl font-bold text-gray-100 mb-8 leading-tight">
                  {/* Connect <span className="text-blue-600">Locally</span> */}
                  Next Gen AI Social Media App for <span
         className={` text-slate-500 inline-block text-outline-white-sm ${
          animate ? "animate__animated animate__slideInUp" : ""
        }`}
      >
        {textArray[currentIndex]}
      </span>
                </h1>
                <p className="text-gray-200 text-lg lg:text-xl max-w-md leading-relaxed">
                  Connect locally, engage meaningfully, and discover your community. Share what matters and build lasting relationships.
                </p>
              </div>

                                    <div className="space-y-3 max-w-md">
                <Link href='/register/account-type' className="w-full bg-white hover:bg-gray-100 text-slate-900 rounded-full py-2 text-lg font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Get started
                </Link>

                <Link
                  href="/login"
                  className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full py-2 text-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  I already have an account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            <div className="flex gap-4">
                  <a 
                    href="#"
                  >
                    <div className='w-46 h-12'>
                    <img src={applestore.src} alt="Download on the App Store" className='w-full h-full rounded' />
                    </div>
                  </a>
                  
                  <a 
                    href="#"
                  >
                    <div className='w-46 h-12'>
                  <img src={playstore.src} alt="Get it on Google Play" className='w-full h-full rounded' />
                    </div>
                  </a>
                </div>
            </div>

            <div className="flex items-center justify-start gap-4 text-slate-500 text-sm mt-4">
              <a href="#" className="hover:text-slate-800 transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-800 transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-800 transition-colors">Contact</a>
            </div>
          </div>

          {/* Right Column with Transparent Image */}
          <div className="relative h-screen overflow-hidden bg-red-500">
              <img
                src={userImage.src}
                alt="Community connection illustration"
                className="w-full !h-full object-contain"
              />
                                <div
                    className={`absolute inset-0 transition-all duration-500 ease-out`}
                  >
                    <div className="relative w-full h-full overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-blue-600">
                      <img
                        src={userImage.src}
                alt="Community connection illustration"
                        className="w-full h-full object-cover opacity-90"
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#05367f] to-transparent" /> */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />

                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="text-right text-white">
                          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                            Featured
                          </div>
                        </div>

                        {/* <div>
                          <h3 className="text-white text-3xl font-bold mb-4">Something</h3>
                          <p className="text-blue-100 text-sm max-w-xs">
                            Connect with people in your area and discover local events and communities.
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">C Cities App</h2>
            <p className="text-slate-400 text-sm">AI social network for counties</p>
          </div>

          {/* Image Section */}
         <img
                src={userImage.src}
                alt="Community connection illustration"
                className="w-full h-full object-contain"
              />

          {/* Content */}
          <div className="flex-1 space-y-8 mt-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-4">
                Next Gen AI Social Media App for <span
         className={` text-slate-500 inline-block text-outline-white-sm ${
          animate ? "animate__animated animate__slideInUp" : ""
        }`}
      >
        {textArray[currentIndex]}
      </span>
              </h1>
              <p className="text-gray-200 text-lg">
                 Connect locally, engage meaningfully, and discover your community. Share what matters and build lasting relationships.
              </p>
            </div>

                                    <div className="space-y-3 max-w-md">
                <Link href='/register/account-type' className="w-full bg-white hover:bg-gray-100 text-slate-900 rounded-full py-2 text-lg font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Get started
                </Link>

                <Link
                  href="/login"
                  className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full py-2 text-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  I already have an account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            <div className="flex justify-center gap-4">
                  <a 
                    href="#"
                  >
                    <div className='w-40 h-10'>
                    <img src={applestore.src} alt="Download on the App Store" className='w-full h-full rounded' />
                    </div>
                  </a>
                  
                  <a 
                    href="#"
                  >
                    <div className='w-40 h-10'>
                  <img src={playstore.src} alt="Get it on Google Play" className='w-full h-full rounded' />
                    </div>
                  </a>
                </div>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
              <a href="#" className="hover:text-slate-800 transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-800 transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-800 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </AuthPageWrapper>
  );
};

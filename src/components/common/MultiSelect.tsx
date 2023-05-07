// import { forwardRef, Ref, useMemo, useState } from "react";
// import { TextInputProps } from "flowbite-react";
// import { Popover } from "flowbite";
//
// const Tag = ({ value }: { value: string }) => {
//   return (
//     <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded text-teal-700 bg-white border border-teal-300 ">
//       <div className="text-xs font-normal leading-none max-w-full flex-initial">
//         {value}
//       </div>
//       <div className="flex flex-auto flex-row-reverse">
//         <div>
//           <svg
//             width="100%"
//             height="100%"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
//           >
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// const MultiSelect = forwardRef(function MultiSelect(
//   {}: TextInputProps,
//   ref: Ref<HTMLInputElement>
// ) {
//   const [targetEl, setTargetEl] = useState<HTMLElement | null>(null),
//     [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
//
//   const popover = useMemo(() => {
//     if (targetEl && triggerEl)
//       return new Popover(targetEl, triggerEl, {
//         triggerType: "click",
//       });
//     return undefined;
//   }, [targetEl, triggerEl]);
//
//   return (
//     <div>
//       <div className="w-full">
//         <div className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-1.5 text-sm">
//           <div className="flex flex-auto flex-wrap">
//             <Tag value={"HTML"} />
//             <Tag value={"Ruby"} />
//             <Tag value={"Javascript"} />
//             <div className="flex-1">
//               <input
//                 placeholder=""
//                 className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
//               />
//             </div>
//           </div>
//           <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
//             <button
//               className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
//               ref={setTriggerEl}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="100%"
//                 height="100%"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-chevron-up w-4 h-4"
//               >
//                 <polyline points="18 15 12 9 6 15"></polyline>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div
//         ref={setTargetEl}
//         id={"multiselect"}
//         role={"tooltip"}
//         className="absolute z-10 invisible inline-block shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
//       >
//         <div className="flex flex-col w-full">
//           <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">Python</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">Javascript</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">Ruby</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">JAVA</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">ASP.Net</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">C++</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">SQL</div>
//               </div>
//             </div>
//           </div>
//           <div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100">
//             <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative border-teal-600">
//               <div className="w-full items-center flex">
//                 <div className="mx-2 leading-6  ">HTML</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });
//
// export default MultiSelect;

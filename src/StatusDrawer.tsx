// import * as React from "react";
// // import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import puppeteer from "puppeteer";
// var trainnos: Array<number> = [];
// var trainnames: Array<string> = [];
// var arrtimes: Array<string> = [];
// var deptimes: Array<string> = [];
// console.log("testtt");

// export function StatusDrawer() {
//   const [goal, setGoal] = React.useState(350);
//   const [Trainnos, setTrainnos] = React.useState(Array<number>);
//   const [Trainnames, setTrainnames] = React.useState(Array<string>);
//   const [Arrtimes, setArrtimes] = React.useState(Array<string>);
//   const [Deptimes, setDeptimes] = React.useState(Array<string>);
//   const [ErrorMessage, setErrorMessage] = React.useState(String);
//   function onClick(adjustment: number) {
//     setGoal(Math.max(200, Math.min(400, goal + adjustment)));
//   }

//   // async function scrapeTrains() {
//   //   const browser = await puppeteer.launch({ headless: true });
//   //   const page = await browser.newPage();
//   //   await page.goto("https://enquiry.indianrail.gov.in/mntes/");
//   //   await page.screenshot({ path: "1.png" });
//   // }
//   // async function getTrains() {
//   //   console.log("getting trains");
//   //   fetch(
//   //     "https://indianrailapi.com/api/v2/AutoCompleteStation/apikey/a65e2044241ad98ebdec2e58dcdb1295/StationCodeOrName/AGC/"
//   //   )
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       if (data.ResponseCode != 200) {
//   //         setErrorMessage(data.Message);
//   //       } else {
//   //         for (let i = data.Trains.length - 1; i > data.Trains.length - 5; i--) {
//   //           console.log(data.Trains[i].TrainNo);
//   //           trainnos = [...trainnos, data.Trains[i].TrainNo];
//   //           trainnames = [...trainnames, data.Trains[i].TrainName];
//   //           arrtimes = [...arrtimes, data.Trains[i].ArrivalTime];
//   //           deptimes = [...deptimes, data.Trains[i].DepartureTime];
//   //           console.log(trainnos);
//   //         }

//   //         setTrainnos(trainnos);
//   //         setTrainnames(trainnames);
//   //         setArrtimes(arrtimes);
//   //         setDeptimes(deptimes);
//   //       }
//   //     });
//   // }

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button className="text-xl absolute z-10 m-4 ms-36" onClick={scrapetra}>
//           Show trains
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle>Trains</DrawerTitle>
//             <DrawerDescription>Live station schedule.</DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4 pb-0">
//             {ErrorMessage}
//             {Trainnos.map((trainno, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="flex justify-between items-center border-b py-2"
//                 >
//                   <span className="font-light">{Arrtimes[index]}</span>
//                   <span className="flex flex-col items-center">
//                     <span className="font-bold">{Trainnames[index]}</span>
//                     <span className="text-sm font-light">{trainno}</span>
//                   </span>
//                   <span className="font-light">{Deptimes[index]}</span>
//                 </div>
//               );
//             })}
//           </div>
//           <DrawerFooter>
//             <DrawerClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }

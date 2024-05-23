// import {
//   Box,
//   Divider,
//   Icon,
//   Link,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@interchain-ui/react";
// import { dependencies, products, Project } from "@/config";

export function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Juno Marketplace</h2>
            <p className="text-gray-400">Your go-to place for unique NFTs</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <nav className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Home</a>
              <a href="#" className="text-gray-400 hover:text-white">Collections</a>
              <a href="#" className="text-gray-400 hover:text-white">About</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </nav>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p className="text-gray-400">&copy; 2023 Juno Marketplace. All rights reserved.</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
    

    </>
  );
}

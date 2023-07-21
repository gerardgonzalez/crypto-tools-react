import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { CryptoTools } from "../pages/CryptoTools";
import { HolderCalculator } from "../pages/CryptoTools/HolderCalculator";

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route exact path="/crypto-tools" element={<CryptoTools />} />
            <Route exact path="/crypto-tools/holder-calculator" element={<HolderCalculator />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </>
  )
}

import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../layouts/LayoutOne";
import HeroSlider from "../containers/hero-sliders/HeroSlider";
import CurrencyTicker from "../containers/currency-tickers/CurrencyTicker";
import EasyStart from "../containers/easy-starts/EasyStart";
import LiveChart from "../components/live-chart/LiveChart";
import SecureTransaction from "../components/secure-transactions/SecureTransaction";
import SoftwareDownload from "../components/software-downloads/SoftwareDownload";
import BlogGrid from "../components/blog-grids/BlogGrid";
import CounterUpCustom from "../containers/counter-ups/CounterUpCustom";
import CurrencyCalculation from "../components/currency-calculations/CurrencyCalculation";

const HomeOne = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Unita | Biz</title>
        <meta
          name="description"
          content="Unita is a place for businesses to succeed"
        />
      </MetaTags>
      <LayoutOne>
        {/* hero slider */}
        <HeroSlider />
        {/* currency ticker */}
        <CurrencyTicker />
        {/* easy start */}
        <EasyStart />
        {/* currency calculation */}
        <CurrencyCalculation />
        {/* counter up */}
        <CounterUpCustom backgroundImage="/images/bg/2.jpg" />
        {/* secure transaction */}
        <SecureTransaction />
        {/* live chart */}
        <LiveChart />
        {/* software download */}
        <SoftwareDownload />
        {/* blog grid */}
        <BlogGrid />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeOne;

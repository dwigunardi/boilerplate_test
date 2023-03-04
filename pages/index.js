import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";

import MainLayout from "@/component/Layout/MainLayout";
import Content from "@/component/Content";
import { Fragment, Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <RecoilRoot>
      <Fragment>
        <MainLayout>
          <Suspense fallback={<p>Loading .....</p>}>
            <Content />
          </Suspense>
        </MainLayout>
      </Fragment>
    </RecoilRoot>
  );
}

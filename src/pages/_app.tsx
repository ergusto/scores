import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "@/lib/api";
import Layout from "@/ui/components/layout";
import { Toaster } from "@/ui/primitives";

import "@/ui/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
          {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools />
          )}
        </Layout>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);

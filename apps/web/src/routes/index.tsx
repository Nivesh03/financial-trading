import { Icons } from "@/components/icons";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid-cols-3 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-12 xl:pt-16 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Take Control of Your Financial Future with{" "}
                <span className="bg-green-600 px-2 text-white">
                  NextGen Trading
                </span>
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Unlock the power of smart investing and real-time market
                insights. Join thousands of successful traders who trust our
                platform to grow their wealth, manage risk, and seize
                opportunities in stocks, mutual funds, and more.
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-x-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-green-600" />
                    Advanced analytics & AI-powered recommendations
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-green-600" />
                    Secure, lightning-fast trades
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-green-600" />
                    24/7 expert support & education
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img
                    src="/users/user-1.png"
                    alt="user image"
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-2.png"
                    alt="user image"
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-3.png"
                    alt="user image"
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-4.jpg"
                    alt="user image"
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                  />
                  <img
                    src="/users/user-5.jpg"
                    alt="user image"
                    className="inline-block object-cover size-10 rounded-full ring-2 ring-slate-100"
                  />
                </div>
                <div className="flex flex-col justify-center items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="size-4 text-green-600 fill-green-600 " />
                    <Star className="size-4 text-green-600 fill-green-600 " />
                    <Star className="size-4 text-green-600 fill-green-600 " />
                    <Star className="size-4 text-green-600 fill-green-600 " />
                    <Star className="size-4 text-green-600 fill-green-600 " />
                  </div>
                  <p>
                    <span className="font-semibold">10,000+</span> thriving
                    investors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{" "}
              <span className="relative px-2">
                traders{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>{" "}
              say
            </h2>
            <img
              src="/snake-2.png"
              alt=""
              className="w-24 order-0 lg:order-2"
            />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 m-2">
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "NextGen Trading has completely transformed my investment
                  strategy. The analytics dashboard is a game-changer, and I
                  love the instant trade execution. My portfolio has never
                  looked better!"
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-1.png"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Trader</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
                <Star className="size-5 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "I started with zero experience, but the educational resources
                  and support team helped me every step of the way. Now I trade
                  confidently and see real results. Highly recommended!"
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-4.jpg"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Josh</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Trader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper className="py-24 max-w-5xl">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-3xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Create your free account and start{" "}
                <span className="relative px-2 bg-green-600 text-white">
                  trading smarter
                </span>{" "}
                today
              </h2>
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5" />
              Zero commission on all trades
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5" />
              Real-time market data & alerts
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5" />
              Personalized portfolio management
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5" />
              Start with as little as ₹100
            </li>

            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
                to="/products"
              >
                Browse Investment Options{" "}
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

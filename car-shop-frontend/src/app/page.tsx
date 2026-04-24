import { BanknotesIcon, ChatBubbleLeftRightIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

const features = [
  {
    name: 'Speedy delivery times',
    description:
      'We guarantee same-day vehicle deliveries. Yes, you heard that right.',
    icon: TruckIcon,
  },
  {
    name: 'Top-of-the-line shopping experience',
    description:
      'Purchase and save your favorite vehicles to your wishlist without a headache.',
    icon: ShoppingBagIcon,
  },
  {
    name: 'World-class customer support',
    description:
      'Talk to our best representatives to solve any issues you encounter.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Thriving trade-in ecosystem',
    description:
      'Exchange your used vehicle for something your heart desires for cheap.',
    icon: BanknotesIcon,
  },
]

export default function Home() {
  return (
    <div className="grow bg-zinc-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Drive faster</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Get your dream vehicle with ease
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            Why wait? You can order your dream car and put it on the road in the same day!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max0w04xl grid grid-flow-col justify-end">
          <Link href="/shop" className="rounded-md text-zinc-50 bg-indigo-600 border border-transparent shadow-xs px-6 py-3 font-medium hover:bg-indigo-700 hover:cursor-pointer">
            Shop now!
          </Link>
        </div>
      </div>
    </div>
  )
}


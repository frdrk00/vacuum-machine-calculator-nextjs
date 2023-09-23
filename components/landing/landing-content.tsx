'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Frederick',
    avatar: 'F',
    title: 'Software Engineer',
    description:
    "This app has made my work so much easier. It's an incredible tool for software engineers like me. I can't imagine my work without this app anymore. It has become an essential part of my daily routine.",
  },
  {
    name: 'Patrick',
    avatar: 'E',
    title: 'CEO',
    description:
      "As a CEO, I need to manage my finances carefully. This app has been a lifesaver for me. Tracking expenses has never been easier. I highly recommend this app to fellow CEOs.",
  },
  {
    name: 'Martina',
    avatar: 'J',
    title: 'Manager',
    description:
      "Managing a team and budget can be challenging, but this app simplifies everything. I'm a manager, and I love how this app helps me keep track of expenses effortlessly.",
  },
  {
    name: 'Yaro',
    avatar: 'Y',
    title: 'Driver',
    description:
      "I spend a lot of time on the road, and this app has helped me save money on my travels. This app is a must-have for anyone who spends their days behind the wheel.",
  },
]

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LandingContent
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xfLFyCW3j5J
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-yellow-400">
                Streamline Your Business with Our All-in-One SaaS Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Unlock the power of our comprehensive SaaS solution to manage your business with ease. From invoicing
                and project management to customer communication and workplace safety, we've got you covered. Boost
                productivity, improve efficiency, and focus on growing your business.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Start Your Free Trial
              </Link>
              <p className="text-gray-500 dark:text-gray-400">
                Experience the power of our SaaS platform with a 14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <BriefcaseIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-yellow-400">Hazard Management</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Streamline your project workflows, collaborate with your team seamlessly, and stay on top of deadlines
                and milestones. Our intuitive hazard management tools make it easy to plan, track, and execute your
                projects with precision.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <ReceiptIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-yellow-400">Invoicing</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Generate professional invoices, track payments, and manage your finances with ease. Our invoicing tools
                help you streamline your billing process, reduce late payments, and gain better visibility into your
                cash flow.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Explore Invoicing
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <CalendarIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-yellow-400">Scheduling</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Easily manage your team's schedules and appointments with our powerful scheduling tools. Streamline your
                operations, avoid conflicts, and ensure your team is always on top of their commitments.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Discover Scheduling
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <BotIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-yellow-400">WhatsApp Chatbots</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Automate your customer communication with our powerful WhatsApp chatbot integration. Provide instant
                support, collect leads, and streamline your sales process. Our chatbots are designed to deliver a
                seamless customer experience, 24/7, so you can focus on growing your business.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Explore WhatsApp Chatbots
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
              <LayoutDashboardIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-yellow-400">Hazard Dashboard</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Monitor and manage workplace hazards with our comprehensive hazard dashboard. Stay on top of safety
                compliance, identify risks, and take proactive measures to protect your employees. Our dashboard
                provides real-time insights, customizable reporting, and advanced analytics to help you maintain a safe
                and productive work environment.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Discover Hazard Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function BotIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function BriefcaseIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CalendarIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function LayoutDashboardIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}


function ReceiptIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </svg>
  )
}
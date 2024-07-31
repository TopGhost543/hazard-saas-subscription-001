/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gIVqp5Pnp73
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Button from '@/components/ui/Button';


export default function Component() {
  
  return (
    <div className="flex min-h-[100dvh] flex-col bg-black text-white">
      <main className="flex-1">
        <section className="bg-black py-12 md:py-16 lg:py-20">
          <div className="container mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-yellow-400">Register Your Company</h1>           
                   <p className="mt-4 text-lg text-gray-400">
                  Our simple and secure registration process makes it easy to get your business up and running. Fill out
                  the form below to get started.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-400">Trusted by thousands of businesses</span>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-400">Secure and compliant registration</span>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-black">Step 1 of 5</span>
                </div>
                <form className="space-y-4">
                  <div>
                    <Label className="text-black" htmlFor="company-name">
                      Company Name
                    </Label>
                    <Input className="bg-white text-black" id="company-name" placeholder="Enter your company name" />
                  </div>
                  {/* <div>
                    <Label className="text-black" htmlFor="company-type">
                      Company Type
                    </Label>
                    <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center">
                        <RadioGroup.Root name="company-type">
                          <RadioGroup.Item
                            className="peer sr-only"
                            id="sole-proprietorship"
                            value="sole-proprietorship"
                          />
                          <Label className="flex cursor-pointer items-center space-x-2" htmlFor="sole-proprietorship">
                            <div className="h-4 w-4 rounded-full border border-gray-300 bg-white transition-colors peer-checked:border-gray-900 peer-checked:bg-gray-900" />
                            <span className="text-black">Sole Proprietorship</span>
                          </Label>
                        </RadioGroup.Root>
                      </div>
                      <div className="flex items-center">
                        <RadioGroup.Root name="company-type">
                          <RadioGroup.Item className="peer sr-only" id="partnership" value="partnership" />
                          <Label className="flex cursor-pointer items-center space-x-2" htmlFor="partnership">
                            <div className="h-4 w-4 rounded-full border border-gray-300 bg-white transition-colors peer-checked:border-gray-900 peer-checked:bg-gray-900" />
                            <span className="text-black">Partnership</span>
                          </Label>
                        </RadioGroup.Root>
                      </div>
                      <div className="flex items-center">
                        <RadioGroup.Root name="company-type">
                          <RadioGroup.Item className="peer sr-only" id="corporation" value="corporation" />
                          <Label className="flex cursor-pointer items-center space-x-2" htmlFor="corporation">
                            <div className="h-4 w-4 rounded-full border border-gray-300 bg-white transition-colors peer-checked:border-gray-900 peer-checked:bg-gray-900" />
                            <span className="text-black">Corporation</span>
                          </Label>
                        </RadioGroup.Root>
                      </div>
                      <div className="flex items-center">
                        <RadioGroup.Root name="company-type">
                          <RadioGroup.Item className="peer sr-only" id="llc" value="llc" />
                          <Label className="flex cursor-pointer items-center space-x-2" htmlFor="llc">
                            <div className="h-4 w-4 rounded-full border border-gray-300 bg-white transition-colors peer-checked:border-gray-900 peer-checked:bg-gray-900" />
                            <span className="text-black">LLC</span>
                          </Label>
                        </RadioGroup.Root>
                      </div>
                    </div>
                  </div> */}
                  <div>
                    <Label className="text-black" htmlFor="industry">
                      Industry
                    </Label>
                    <Input className="bg-white text-black" id="industry" placeholder="Enter your industry" />
                  </div>
                  <div>
                    <Label className="text-black" htmlFor="employees">
                      Number of Employees
                    </Label>
                    <Input
                      className="bg-white text-black"
                      id="employees"
                      placeholder="Enter number of employees"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label className="text-black" htmlFor="headquarters">
                      Headquarters Location
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Input className="bg-white text-black" id="headquarters-country" placeholder="Country" />
                      </div>
                      <div>
                        <Input className="bg-white text-black" id="headquarters-state" placeholder="State/Province" />
                      </div>
                      <div>
                        <Input className="bg-white text-black" id="headquarters-city" placeholder="City" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-black" htmlFor="company-description">
                      Company Description
                    </Label>
                    <Textarea
                      className="bg-white text-black"
                      id="company-description"
                      placeholder="Enter a brief description of your company"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-yellow-400 text-black">Next</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-black py-12 md:py-16 lg:py-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white p-6 shadow-lg sm:p-8 w-full">
              <h2 className="text-2xl font-bold tracking-tight text-black">Review Your Information</h2>
              <p className="mt-4 text-lg text-black">
                Before submitting your registration, please review the information you've provided.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Company Name:</span>
                  <span className="text-black"> </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Company Type:</span>
                  <span className="text-black"> </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Industry:</span>
                  <span className="text-black"> </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Number of Employees:</span>
                  <span className="text-black"> </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Headquarters:</span>
                  <span className="text-black"> </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Company Description:</span>
                  <span className="text-black">
                    
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">Founders:</span>
                  <span className="text-black">
                    John Doe (john@acme.com, 555-1234), Jane Smith (jane@acme.com, 555-5678)
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Submit Registration</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CheckIcon(props:any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function MountainIcon(props:any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
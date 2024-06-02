import Image from "next/image";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { RotateCw, Copy } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [length, setLength] = useState(20);


  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 sm:p-2 bg-[#314455]`}
    >
      <div className="font-semibold text-2xl sm:text-5xl text-white mb-2 mt-24">
        <h1>Password Generator</h1>
      </div>

      <div className="w-full grid grid-cols-12 p-4 mt-6 rounded-lg ">
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 ">
          <Input
            type="text"
            placeholder="Email"
            className={cn(
              "h-[60px] rounded-[50px] text-center text-xl sm:text-2xl font-medium bg-white border-[#66fcf1] border"
            )}
            value={"Qsd@324s@#sd23s@##$#"}
          />
        </div>
      </div>
      <div className=" col-span-12 mt-2">
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className=" col-span-6">
            <Button className="w-full">
              <RotateCw className="animate-refresh" />
            </Button>
          </div>
          <div className=" col-span-6">
            <Button className="w-full bg-[#f79e02] hover:bg-[#eb190e]">
              <Copy />
            </Button>
          </div>
        </div>
      </div>
      <Card className="sm:w-[60%]">
        <div className="p-1 justify-center text-center rounded-md">
          <CardContent>
            <div className="grid grid-cols-12 p-4 mt-6  rounded-lg">
              <div className="col-span-12 mt-2">
                <div className="grid grid-cols-12 gap-10">
                  <div className="col-span-8 sm:col-span-8 ">
                    <div className="col-span-8 sm:col-span-6 flex m-4">
                      <Label className="mr-2">Length</Label>
                      <Slider
                        defaultValue={[length]}
                        max={100}
                        min={6}
                        step={1}
                        className={cn("cursor-pointer m-2 w-full sm:w-[100%]")}
                        onValueChange={(event) => setLength(event[0])}
                      />
                      {length}
                    </div>
                    <div className="col-span-8 sm:col-span-6 flex m-4">
                      <Select defaultValue="randomPassword">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="randomPassword">
                              Random Password
                            </SelectItem>
                            <SelectItem value="pin">PIN</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className=" col-span-8 sm:col-span-4 mt-2">
                    <div className="grid grid-cols-6 gap-4 content-center">
                      <div className="col-span-3 sm:col-span-12">
                        <div className="content-center">
                          <div className="flex items-center justify-start space-x-4 align-middle">
                            <Switch id="airplane-mode" className="bg-[red]" />
                            <Label htmlFor="airplane-mode">Uppercase</Label>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-12">
                        <div className="content-center">
                          <div className="flex items-center justify-start space-x-4 align-middle">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Lowercase</Label>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-12">
                        <div className="content-center">
                          <div className="flex items-center justify-start space-x-4 align-middle">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Symbols</Label>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-12">
                        <div className="content-center">
                          <div className="flex items-center justify-start space-x-4 align-middle">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Numbers</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}

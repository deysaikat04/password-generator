import Image from "next/image";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { RotateCw, Copy } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

enum PasswordTypeEnum {
  RandomPassword = "randomPassword",
  Pin = "pin",
}

export default function Home() {
  const [password, setPassword] = useState("");

  const [length, setLength] = useState(16);
  const [maxLength, setMaxLength] = useState(100);
  const [passwordType, setPasswordType] = useState(
    PasswordTypeEnum.RandomPassword
  );
  const [isUpperCaseChecked, setIsUpperCaseChecked] = useState(false);
  const [isLowerCaseChecked, setIsLowerCaseChecked] = useState(true);
  const [isSymbolChecked, setIsSymbolChecked] = useState(false);
  const [isNumberChecked, setIsNumberChecked] = useState(false);

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const isPinSelected = passwordType === PasswordTypeEnum.Pin;

  const generateRandomPassword = () => {
    let allChars = "";
    let password = "";

    if (passwordType === PasswordTypeEnum.RandomPassword) {
      if (isUpperCaseChecked) allChars += upperCaseChars;
      if (isLowerCaseChecked) allChars += lowerCaseChars;
      if (isNumberChecked) allChars += numberChars;
      if (isSymbolChecked) allChars += symbolChars;

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }
    } else {
      if (isNumberChecked) allChars += numberChars;

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }
    }

    setPassword(password);
  };

  useEffect(() => {
    generateRandomPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUpperCaseChecked,
    isLowerCaseChecked,
    isSymbolChecked,
    isNumberChecked,
    length,
  ]);

  useEffect(() => {
    if (
      !isUpperCaseChecked &&
      !isLowerCaseChecked &&
      !isSymbolChecked &&
      !isNumberChecked
    ) {
      setIsLowerCaseChecked(true);
    }
  }, [
    isUpperCaseChecked,
    isLowerCaseChecked,
    isSymbolChecked,
    isNumberChecked,
  ]);

  useEffect(() => {
    if (passwordType === PasswordTypeEnum.Pin) {
      setIsNumberChecked(true);
      setIsUpperCaseChecked(false);
      setIsLowerCaseChecked(false);
      setIsSymbolChecked(false);
      setMaxLength(20);
      setLength(4);
    } else {
      setMaxLength(100);
      setLength(16);
      setIsNumberChecked(false);
      setIsLowerCaseChecked(true);
    }
  }, [passwordType]);

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(password);
      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error("Failed to copy: ", err);
      /* Rejected - text failed to copy to the clipboard */
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 sm:p-2 bg-[#314455]`}
    >
      <div className="font-semibold text-2xl sm:text-4xl text-white mb-2 mt-24">
        <h1>Password Generator</h1>
      </div>

      <div className="w-full grid grid-cols-12 p-4 mt-6 rounded-lg ">
        <div className="col-span-12 sm:col-span-6 sm:col-start-4 ">
          <Input
            type="text"
            className={cn(
              "h-[60px] rounded-[50px] text-center text-xl sm:text-2xl font-medium bg-white border-[#66fcf1] border"
            )}
            value={password}
          />
        </div>
      </div>

      {/* Buttons start */}
      <div className="col-span-12 mt-2">
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className=" col-span-6">
            <Button className="w-full" onClick={generateRandomPassword}>
              <RotateCw className="animate-refresh" />
            </Button>
          </div>
          <div className=" col-span-6">
            <Button
              className="w-full bg-[#f79e02] hover:bg-[#e0940f]"
              onClick={copyContent}
            >
              <Copy />
            </Button>
          </div>
        </div>
      </div>
      {/* Buttons end */}

      <Card className="md:w-[50%]">
        <CardContent
          className={cn("p-1 justify-center text-center rounded-md")}
        >
          <div className="grid grid-cols-12 p-4 rounded-lg gap-2 sm:gap-4">
            <div className="col-span-12 sm:col-span-8 mt-2 ">
              <div className="flex flex-col">
                <div className="flex m-4">
                  <Label className="mr-2">Length</Label>
                  <Slider
                    defaultValue={[length]}
                    max={maxLength}
                    min={6}
                    step={1}
                    className={cn("cursor-pointer m-2 w-full sm:w-[100%]")}
                    onValueChange={(event) => setLength(event[0])}
                  />
                  {length}
                </div>
                <div>
                  <Select
                    defaultValue="randomPassword"
                    value={passwordType}
                    onValueChange={(value) =>
                      setPasswordType(value as PasswordTypeEnum)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={PasswordTypeEnum.RandomPassword}>
                          Random Password
                        </SelectItem>
                        <SelectItem value={PasswordTypeEnum.Pin}>
                          PIN
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-4 mt-2">
              <div className="flex flex-row  flex-wrap sm:flex-col">
                <div className="content-center p-2">
                  <div className="flex items-center justify-start space-x-4 align-middle">
                    <Switch
                      id="airplane-mode"
                      checked={isUpperCaseChecked}
                      onCheckedChange={setIsUpperCaseChecked}
                      disabled={isPinSelected}
                    />
                    <Label htmlFor="airplane-mode">Uppercase</Label>
                  </div>
                </div>
                <div className="content-center p-2">
                  <div className="flex items-center justify-start space-x-4 align-middle">
                    <Switch
                      id="airplane-mode"
                      checked={isLowerCaseChecked}
                      onCheckedChange={setIsLowerCaseChecked}
                      disabled={isPinSelected}
                    />
                    <Label htmlFor="airplane-mode">Lowercase</Label>
                  </div>
                </div>
                <div className="content-center p-2">
                  <div className="flex items-center justify-start space-x-4 align-middle">
                    <Switch
                      id="airplane-mode"
                      checked={isSymbolChecked}
                      onCheckedChange={setIsSymbolChecked}
                      disabled={isPinSelected}
                    />
                    <Label htmlFor="airplane-mode">Symbols</Label>
                  </div>
                </div>
                <div className="content-center p-2">
                  <div className="flex items-center justify-start space-x-4 align-middle">
                    <Switch
                      id="airplane-mode"
                      checked={isPinSelected || isNumberChecked}
                      onCheckedChange={setIsNumberChecked}
                      disabled={isPinSelected}
                    />
                    <Label htmlFor="airplane-mode">Numbers</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";

const AuthDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "h-10 w-10 scale-100 hover:bg-transparent hover:text-white transition-all hover:scale-125 duration-300 ease-in-out",
              "text-bg-pink hover:text-pink-cerah transition-colors"
            )}
          >
            <User className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Masuk ke akun anda untuk menikmati tawaran khusus member, dan
              akses fitur-fitur khusus.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="ayuningsih@gmail.com"
                type="email"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-pink-cerah underline"
                >
                  Lupa password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className="flex flex-col  items-center gap-3 justify-center">
            <Button
              type="submit"
              variant="default"
              className="w-full bg-pink-cerah hover:bg-transparent transition-colors border hover:text-text-dark"
            >
              Login
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
          <DialogFooter className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              Belum punya akun?
            </span>
            <Link
              href="/register"
              className="hover:text-pink-cerah  text-sm underline underline-offset-4"
            >
              Daftar
            </Link>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AuthDialog;

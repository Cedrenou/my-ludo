'use client'
import {supabase} from "@/lib/supabase";

const SignIn = () => {

  async function signInWithEmail() {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: 'valid.email@supabase.io',
      password: 'example-password',
    })
  }

  async function resetPassword(email: string) {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'login/change-password',
    })
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = (e.target as any).email.value;
        const password = (e.target as any).password.value;
        signInWithEmail(email, password);
      }}>
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>
      {/*  RESET password */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = (e.target as any).email.value;
        resetPassword(email);
      }}>
        <input type="email" name="email" placeholder="Email"/>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );

}

export default SignIn;
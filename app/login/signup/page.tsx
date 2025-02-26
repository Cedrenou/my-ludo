'use client'
import {supabase} from "@/lib/supabase";

const Signup = () => {

  async function signUpNewUser(email: string, password: string) {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = (e.target as any).email.value;
        const password = (e.target as any).password.value;
        signUpNewUser(email, password);
      }}>
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup;
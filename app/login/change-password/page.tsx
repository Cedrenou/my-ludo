'use client';
import {supabase} from "@/lib/supabase";

const ChangePasswordPage = () => {
  async function changePassword(new_password: string) {
    await supabase.auth.updateUser({password: new_password})
  }

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const new_password = (e.target as any).new_password.value;
        changePassword(new_password);
      }}>
        <input type="password" name="new_password" placeholder="New Password"/>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
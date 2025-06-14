import bcrypt from 'bcrypt';

const isPasswordHashMatch = async (plainPassword,hashedPassword)=>{
    console.log(plainPassword,hashedPassword);

 const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

if (isMatch) {
  console.log('Password is correct!');
  return true;
} else {
  console.log('Invalid password!');
  return false;
}
}
export default isPasswordHashMatch;

import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import { Link } from 'react-router-dom';
import HabeshaLogo from '../assets/images/HabeshaLogo.jpeg';
import api from '../componets/api/api';
import { useSelector } from 'react-redux';

const Registration = () => {
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCPassword, setErrCPassword] = useState("");

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const language = useSelector((state) => state.habesha.language); // Access language state

  // Define bilingual text
  const text = {
    EN: {
      createAccount: 'Create Account',
      yourName: 'Your name',
      enterYourName: 'Enter Your name',
      emailOrPhone: 'Email or Phone number',
      enterYourEmail: 'Enter Your Email',
      enterValidEmail: 'Enter valid email',
      password: 'Password',
      enterPassword: 'Enter your password',
      passwordLength: 'Password must be at least 6 characters',
      reEnterPassword: 'Re-enter Password',
      confirmPassword: 'Confirm your password',
      passwordsDontMatch: "Passwords don't match",
      passwordHint: 'Password must be at least 6 characters',
      continue: 'Continue',
      agreement: "By Creating, you agree to Habesha's",
      conditionsOfUse: 'Conditions of Use',
      privacyNotice: 'Privacy Notice',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      help: 'Help',
      footer: '2025, ReactBd, Inc. or its affiliates',
      returnToHome: 'Return to Home', // For the return icon
    },
    AMH: {
      createAccount: 'መለያ ፍጠር',
      yourName: 'ስምህ',
      enterYourName: 'ስምህን አስገባ',
      emailOrPhone: 'ኢሜይል ወይም ስልክ ቁጥር',
      enterYourEmail: 'ኢሜይልህን አስገባ',
      enterValidEmail: 'ትክክለኛ ኢሜይል አስገባ',
      password: 'የይለፍ ቃል',
      enterPassword: 'የይለፍ ቃልህን አስገባ',
      passwordLength: 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት',
      reEnterPassword: 'የይለፍ ቃል እንደገና አስገባ',
      confirmPassword: 'የይለፍ ቃልህን አረጋግጥ',
      passwordsDontMatch: 'የይለፍ ቃሎች አይዛመዱም',
      passwordHint: 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት',
      continue: 'ቀጥል',
      agreement: 'በመፍጠር፣ የሀበሻ የአጠቃቀም ሁኔታዎችን እና',
      conditionsOfUse: 'የአጠቃቀም ሁኔታዎች',
      privacyNotice: 'የግላዊነት ማስታወቂያ',
      alreadyHaveAccount: 'መለያ አለህ?',
      signIn: 'ግባ',
      help: 'እገዛ',
      footer: '2025, ReactBd, Inc. ወይም ተባባሪዎቹ',
      returnToHome: 'ወደ መነሻ ገፅ ተመለስ', // For the return icon
    },
  };

  const currentText = text[language];

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName('');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
  };

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setErrCPassword('');
  };

  const emailValidation = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!clientName) setErrClientName(currentText.enterYourName);
    if (!email) setErrEmail(currentText.enterYourEmail);
    else if (!emailValidation(email)) setErrEmail(currentText.enterValidEmail);
    if (!password) setErrPassword(currentText.enterPassword);
    else if (password.length < 6) setErrPassword(currentText.passwordLength);
    if (!cPassword) setErrCPassword(currentText.confirmPassword);
    else if (password !== cPassword) setErrCPassword(currentText.passwordsDontMatch);

    const isValid = clientName && emailValidation(email) && password.length >= 6 && password === cPassword;

    if (!isValid) return;

    try {
      await api.post('/auth/register', {
        name: clientName,
        email,
        password,
        role: 'user',
      });

      alert("Registration successful. Please sign in.");
      setClientName('');
      setEmail('');
      setPassword('');
      setCPassword('');
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      setErrEmail(msg);
    }
  };

  return (
    <div lang={language === 'EN' ? 'en' : 'am'} className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          {/* Return to Home Icon */}
          <div className="w-full flex justify-start mb-4">
            <Link to="/" title={currentText.returnToHome}>
              <div className="group cursor-pointer flex items-center gap-1 text-gray-600 hover:text-habesha_blue">
                <HomeIcon className="text-2xl" />
                <span className="text-sm group-hover:underline">{currentText.returnToHome}</span>
              </div>
            </Link>
          </div>

          <img className="w-46 py-4 rounded-t-md" src={HabeshaLogo} alt="logo" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">{currentText.createAccount}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">{currentText.yourName}</p>
                <input
                  value={clientName}
                  onChange={handleName}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">{currentText.emailOrPhone}</p>
                <input
                  value={email}
                  onChange={handleEmail}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100"
                  type="email"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">{currentText.password}</p>
                <input
                  value={password}
                  onChange={handlePassword}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100"
                  type="password"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">{currentText.reEnterPassword}</p>
                <input
                  value={cPassword}
                  onChange={handleCPassword}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-habeshaInput duration-100"
                  type="password"
                />
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errCPassword}
                  </p>
                )}
                {errEmail ? (
                  <></>
                ) : (
                  <p className="text-xs text-gray-600">{currentText.passwordHint}</p>
                )}
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-habeshaInput"
              >
                {currentText.continue}
              </button>
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              {currentText.agreement}{' '}
              <span className="text-blue-600">{currentText.conditionsOfUse}</span>{' '}
              {language === 'EN' ? 'and' : 'እና'}{' '}
              <span className="text-blue-600">{currentText.privacyNotice}</span>.
            </p>
            <div className="text-xs text-black">
              <p className="mt-1">
                {currentText.alreadyHaveAccount}{' '}
                <Link to="/SignIn">
                  <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    {currentText.signIn} <ArrowRightIcon />
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer duration-100">
            {currentText.conditionsOfUse}
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer duration-100">
            {currentText.privacyNotice}
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer duration-100">
            {currentText.help}
          </p>
        </div>
        <p className="text-xs text-gray-600">{currentText.footer}</p>
      </div>
    </div>
  );
};

export default Registration;
import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import { Link, useNavigate } from 'react-router-dom';
import HabeshaLogo from '../assets/images/HabeshaLogo.jpeg';
import api from '../componets/api/api';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errRole, setErrRole] = useState("");

  const navigate = useNavigate();
  const language = useSelector((state) => state.habesha.language);

  const text = {
    EN: {
      signIn: 'Sign In',
      email: 'Email',
      enterEmail: 'Enter Your Email',
      enterValidEmail: 'Enter valid email',
      password: 'Password',
      enterPassword: 'Enter your password',
      passwordLength: 'Password must be at least 6 characters',
      selectRole: 'Select Role',
      rolePlaceholder: '-- Select Role --',
      userRole: 'User',
      adminRole: 'Admin',
      pleaseSelectRole: 'Please select your role',
      continue: 'Continue',
      agreement: "By continuing, you agree to Habesha's",
      conditionsOfUse: 'Conditions of Use',
      privacyNotice: 'Privacy Notice',
      needHelp: 'Need Help?',
      newToHabesha: 'New to Habesha?',
      createAccount: 'Create Your Account',
      help: 'Help',
      footer: '2025, ReactBd, Inc. or its affiliates',
      returnToHome: 'Return to Home', // Added for the tooltip/label
    },
    AMH: {
      signIn: 'ግባ',
      email: 'ኢሜይል',
      enterEmail: 'ኢሜይልህን አስገባ',
      enterValidEmail: 'ትክክለኛ ኢሜይል አስገባ',
      password: 'የይለፍ ቃል',
      enterPassword: 'የይለፍ ቃልህን አስገባ',
      passwordLength: 'የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት',
      selectRole: 'ሚና ምረጥ',
      rolePlaceholder: '-- ሚና ምረጥ --',
      userRole: 'ተጠቃሚ',
      adminRole: 'አስተዳዳሪ',
      pleaseSelectRole: 'እባክህ ሚናህን ምረጥ',
      continue: 'ቀጥል',
      agreement: 'በመቀጠል፣ የሀበሻ የአጠቃቀም ሁኔታዎችን እና',
      conditionsOfUse: 'የአጠቃቀም ሁኔታዎች',
      privacyNotice: 'የግላዊነት ማስታወቂያ',
      needHelp: 'እገዛ ይፈልጋሉ?',
      newToHabesha: 'ለሀበሻ አዲስ ነዎት?',
      createAccount: 'መለያህን ፍጠር',
      help: 'እገዛ',
      footer: '2025, ReactBd, Inc. ወይም ተባባሪዎቹ',
      returnToHome: 'ወደ መነሻ ገፅ ተመለስ', // Added for the tooltip/label
    },
  };

  const currentText = text[language];

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword('');
  };

  const handleRole = (e) => {
    setRole(e.target.value);
    setErrRole('');
  };

  const emailValidation = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!email) {
      setErrEmail(currentText.enterEmail);
      isValid = false;
    } else if (!emailValidation(email)) {
      setErrEmail(currentText.enterValidEmail);
      isValid = false;
    }

    if (!password) {
      setErrPassword(currentText.enterPassword);
      isValid = false;
    } else if (password.length < 6) {
      setErrPassword(currentText.passwordLength);
      isValid = false;
    }

    if (!role) {
      setErrRole(currentText.pleaseSelectRole);
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        role,
      });

      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";
      setErrEmail(msg);
    }
  };

  
  return (
    <div lang={language === 'EN' ? 'en' : 'am'} className="w-full min-h-screen bg-gray-100">
      <div className="max-w-[container] mx-auto px-4 xs:px-6 sm:px-8 py-6">
        <form className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Logo */}
          <img
            className="w-32 xs:w-36 sm:w-40 md:w-48 py-4 rounded-t-md"
            src={HabeshaLogo}
            alt="Habesha Logo"
          />

          {/* Form Container */}
          <div className="w-full bg-habesha_white border border-zinc-200 p-4 xs:p-6 rounded-md">
            <h2 className="font-titleFont text-2xl xs:text-3xl font-semibold mb-4 text-habesha_blue">
              {currentText.signIn}
            </h2>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <p className="text-sm xs:text-base font-medium text-habesha_blue">
                  {currentText.email}
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full py-2 xs:py-2.5 border border-zinc-400 px-3 text-sm xs:text-base rounded-sm outline-none focus-within:border-habesha_yellow focus-within:shadow-habeshaInput duration-100"
                  type="email"
                  placeholder={currentText.enterEmail}
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <p className="text-sm xs:text-base font-medium text-habesha_blue">
                  {currentText.password}
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full py-2 xs:py-2.5 border border-zinc-400 px-3 text-sm xs:text-base rounded-sm outline-none focus-within:border-habesha_yellow focus-within:shadow-habeshaInput duration-100"
                  type="password"
                  placeholder={currentText.enterPassword}
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errPassword}
                  </p>
                )}
              </div>

              {/* Role Dropdown */}
              <div className="flex flex-col gap-2">
                <p className="text-sm xs:text-base font-medium text-habesha_blue">
                  {currentText.selectRole}
                </p>
                <select
                  onChange={handleRole}
                  value={role}
                  className="w-full py-2 xs:py-2.5 border border-zinc-400 px-3 text-sm xs:text-base rounded-sm outline-none focus-within:border-habesha_yellow focus-within:shadow-habeshaInput duration-100"
                >
                  <option value="">{currentText.rolePlaceholder}</option>
                  <option value="user">{currentText.userRole}</option>
                  <option value="admin">{currentText.adminRole}</option>
                </select>
                {errRole && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-semibold text-base">!</span>
                    {errRole}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSignIn}
                className="w-full py-2 xs:py-2.5 text-sm xs:text-base font-normal rounded-sm bg-gradient-to-t from-habesha_yellow to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-habeshaInput"
              >
                {currentText.continue}
              </button>
            </div>

            {/* Agreement Text */}
            <p className="text-xs xs:text-sm text-habesha_blue leading-4 mt-4">
              {currentText.agreement}{' '}
              <Link to="/conditions" className="text-blue-600 hover:text-orange-700 hover:underline">
                {currentText.conditionsOfUse}
              </Link>{' '}
              {language === 'EN' ? 'and' : 'እና'}{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-orange-700 hover:underline">
                {currentText.privacyNotice}
              </Link>.
            </p>

            {/* Need Help Link */}
            <p className="text-xs xs:text-sm text-gray-600 mt-4 cursor-pointer group">
              <ArrowRightIcon className="inline-block" />
              <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                {currentText.needHelp}
              </span>
            </p>
          </div>

          {/* Create Account Section */}
          <p className="w-full text-xs xs:text-sm text-gray-600 mt-4 flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">{currentText.newToHabesha}</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </p>

          <Link className="w-full" to="/Regestration">
            <button className="w-full py-2 xs:py-2.5 mt-4 text-sm xs:text-base font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-habeshaInput">
              {currentText.createAccount}
            </button>
          </Link>

          {/* Home Button */}
          <Link to="/" className="mt-4 flex items-center gap-1 text-blue-600 hover:text-orange-700 hover:underline">
            <HomeIcon className="text-habesha_blue" />
            <span className="text-xs xs:text-sm">{currentText.returnToHome}</span>
          </Link>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full bg-gradient-to-t from-habesha_white via-habesha_white to-zinc-200 flex flex-col items-center py-8 xs:py-10">
        <div className="flex flex-col xs:flex-row items-center gap-4 xs:gap-6">
          <Link to="/conditions">
            <p className="text-xs xs:text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
              {currentText.conditionsOfUse}
            </p>
          </Link>
          <Link to="/privacy">
            <p className="text-xs xs:text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
              {currentText.privacyNotice}
            </p>
          </Link>
          <Link to="/help">
            <p className="text-xs xs:text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
              {currentText.help}
            </p>
          </Link>
        </div>
        <p className="text-xs xs:text-sm text-gray-600 mt-4">{currentText.footer}</p>
      </div>
    </div>
  );
};

export default SignIn;
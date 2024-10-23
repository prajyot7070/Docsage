
import Image from 'next/image';
import logo from '../assets/docsage_logo.png';

export function Logo() {
  return (
    <div className="flex justify-center mt-5 py-3">
      <Image 
        src={logo}
        alt="Logo"
        width={120}
        height={120}
      />
    </div>
  );
}


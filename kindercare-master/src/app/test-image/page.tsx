import Image from 'next/image';

export default function TestImage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test Gambar Tips</h1>
      
      <div className="space-y-4">
        <div>
          <h3>Dengan Next.js Image:</h3>
          <div className="relative w-64 h-40 bg-gray-100">
            <Image
              src="/image/tips/when-child-asks-about-pregnancy.png"
              alt="Test"
              fill
              className="object-cover"
              unoptimized={true}
            />
          </div>
        </div>
        
        <div>
          <h3>Dengan HTML img:</h3>
          <img 
            src="/image/tips/when-child-asks-about-pregnancy.png"
            alt="Test"
            className="w-64 h-40 object-cover"
          />
        </div>
        
        <div>
          <h3>Default image:</h3>
          <img 
            src="/image/tips/default-tip.png"
            alt="Test"
            className="w-64 h-40 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

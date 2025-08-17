import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils';
import { Pencil } from 'lucide-react';

interface WritableValueProps {
  className?: string;
  initialValue: string;
  onChange: (value: string) => void;
}

export const WritableValue = ({ className, initialValue, onChange }: WritableValueProps) => {
  const [isWrite, setIsWrite] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isWrite) {
      inputRef?.current?.focus();
    }
  }, [isWrite]);

  return (
    <button className={cn('relative w-fit flex items-center', className)} onClick={() => setIsWrite(true)}>
      <div
        className={cn(
          'absolute outline-none -left-2.5 -top-1 invisible rounded-lg p-2 text-white h-[calc(100%+6px)] w-[calc(100%+20px)] border border-[#39FF14] bg-background backdrop-blur-[8px]',
          { visible: isWrite }
        )}
      />
      <div className="flex items-center gap-x-1 text-white h-fit w-fit">
        <span className="text-transparent">{initialValue}</span>
        <Pencil className="size-3 relative z-2 text-[#39FF14]" />
      </div>
      <input
        className={cn('bg-transparent outline-0 w-full border-0 absolute top-0 text-white left-0')}
        value={initialValue}
        onBlur={() => {
          setIsWrite(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsWrite(false);
          }
        }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        ref={inputRef}
      />
    </button>
  );
};

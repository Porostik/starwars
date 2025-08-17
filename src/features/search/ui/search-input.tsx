import { useDebounce } from '@/shared/hooks';
import { Skeleton } from '@/shared/ui/skeleton';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (value: string) => void;
  initialValue: string;
  isDisabled?: boolean;
}

export const SearchInput = ({ onSearch, initialValue, isDisabled }: SearchInputProps) => {
  const debouncedChangeSearch = useDebounce(onSearch, 500);

  return (
    <div className="bg-card p-3 w-full flex items-center justify-between rounded-lg gap-x-3">
      <input
        className="w-full text-white outline-none border-b border-background pl-1"
        placeholder="Search..."
        defaultValue={initialValue}
        onChange={(e) => debouncedChangeSearch(e.target.value)}
        disabled={isDisabled}
      />

      <Search className="text-white" />
    </div>
  );
};

const SearchInputSkeleton = () => {
  return <Skeleton className="min-h-[49px] w-full" />;
};

SearchInput.Skeleton = SearchInputSkeleton;

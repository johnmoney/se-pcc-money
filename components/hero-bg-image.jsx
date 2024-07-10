import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";
import { InputText } from '@pantheon-systems/pds-toolkit-react';

export const searchQueryAtom = atom("");

export default function PageHeader({ title }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

return (
<section className="hero-section">
    <div className="w-full h-[520px] bg-[url('https://images.unsplash.com/photo-1517539052038-d57efd36e95a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center ">

        <div className="pds-container">
            <h1 className="text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl font-semibold bg-gray-800 p-2 bg-opacity-40 rounded-sm">
              {title}
            </h1>
            <InputText 
              className='pds-spacing-mar-block-xl' 
              id={"hero-search"} 
              type='search' 
              label='Search site' 
              showLabel={false} 
              placeholder='Search departments and services...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push({
                    pathname: "/search",
                    query: {
                      q: searchQuery,
                    },
                  });
                }
              }}
            />
        </div>
    </div>
</section>
  );
}

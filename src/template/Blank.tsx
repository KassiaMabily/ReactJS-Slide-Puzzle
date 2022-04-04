import { ChevronLeftIcon } from '@heroicons/react/outline'

export default function Blank({ children, title, showBackButton = false }: Props) {
    return (
        <article className="flex justify-center items-center h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="rounded-lg space-y-4 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className='flex space-x-4'>
                        {
                            showBackButton && (
                                <button
                                    type="button"
                                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            )
                        }
                        

                        <h1 className='text-lg'>{title}</h1>
                    </div>
                    
                    
                    {children}
                </div>
            </div>
        </article>
    )
}

type Props = {
    children: React.ReactNode;
    showBackButton?: boolean;
    title: string;
}
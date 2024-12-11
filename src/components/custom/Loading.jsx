/* eslint-disable react/prop-types */
import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"

function Loading({ cusloading }) {
    return (
        <div>
            <AlertDialog open={cusloading}>
                <AlertDialogContent>
                <div className='flex flex-col items-center justify-center my-10 '>
                    <img src="/progress.gif" alt="" className='w-[100px] h-[100px]' />
                    <h2 className='text-lg font-semibold'>Generating Your Trip</h2>
                </div>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default Loading

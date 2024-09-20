import { useState } from "react";

import { useUpdateOrder } from "../../hook/order/useUpdateOrder";

import MiniLoader from "../../ui/MiniLoader";
import RadioBtns from "../../ui/RadioBtns";
import FormBtn from "../../ui/FormBtn";

function OrderForm({ onClose, id, status }) {
    const [value, setValue] = useState(status);
    const [isEditing, setIsEditing] = useState(false);
    const { updateOrder } = useUpdateOrder();

    function handleSubmit(event) {
        event.preventDefault();
        setIsEditing(true);
        updateOrder(
            {
                status: value,
                id: id,
            },
            {
                onSettled: () => {
                    setIsEditing(false);
                    onClose?.();
                },
            }
        );
    }
    return (
        <form className="flex flex-col gap-y-5 w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl capitalize font-bold">
                update order status
            </h1>
            <RadioBtns value={value} setValue={setValue} />
            <div className="w-full border-t border-content mt-2 pt-3 pb-1 flex justify-end">
                <div className="flex gap-3 items-center flex-wrap">
                    {isEditing && <MiniLoader />}
                    <FormBtn
                        type={"reset"}
                        label={"cancel"}
                        onClick={() => onClose?.()}
                        disabled={isEditing}
                    />
                    <FormBtn
                        type={"submit"}
                        label={"update order"}
                        onClick={handleSubmit}
                        disabled={isEditing || value === status}
                    />
                </div>
            </div>
        </form>
    );
}

export default OrderForm;

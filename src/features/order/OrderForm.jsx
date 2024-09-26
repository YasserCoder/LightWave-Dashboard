import { useState } from "react";

import { useUpdateOrder } from "../../hook/order/useUpdateOrder";

import MiniLoader from "../../ui/MiniLoader";
import RadioBtns from "../../ui/RadioBtns";
import FormBtn from "../../ui/FormBtn";
import Form from "../../ui/Form";

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
        <Form title={"update order status"} handleSubmit={handleSubmit}>
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
        </Form>
    );
}

export default OrderForm;

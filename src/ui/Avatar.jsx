import { BsPlusCircle } from "react-icons/bs";

function Avatar({ avatar, setAvatar, style }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAvatar((prevItems) => ({ ...prevItems, avatar: file }));
    };
    const removeImage = () => {
        setAvatar((prevItems) => ({ ...prevItems, avatar: "" }));
    };
    return (
        <div className={`flex flex-col gap-y-2 ${style}`}>
            <label className="font-semibold xs:font-extrabold capitalize mb-0.5">
                Avatar
            </label>
            <input
                id="avtr-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
            <div className="flex flex-wrap gap-2">
                {avatar && (
                    <div className="relative">
                        <img
                            src={
                                avatar?.name
                                    ? URL.createObjectURL(avatar)
                                    : avatar
                            }
                            alt="Avatar Preview"
                            className="h-16 w-16 object-cover rounded-full"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full size-4 text-xs hover:bg-red-700"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {!avatar && (
                    <label
                        htmlFor="avtr-upload"
                        className="cursor-pointer bg-bkg-secondary text-3xl flex justify-center items-center text-content h-16 w-16 rounded-full duration-300 hover:text-gray-300 hover:bg-input"
                    >
                        <BsPlusCircle />
                    </label>
                )}
            </div>
        </div>
    );
}

export default Avatar;

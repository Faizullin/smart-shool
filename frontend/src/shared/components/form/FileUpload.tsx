import React from "react";
import { FormattedMessage } from "react-intl";

interface IFileUploadProps {
	value: File | null,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FileUpload(props: IFileUploadProps) {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(event)
	};

	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pointer" htmlFor="file_input">
				<FormattedMessage id="upload_file" defaultMessage="Upload file"/>
			</label>
			<input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
			{props.value && <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{props.value.name} ({props.value.type})</p>}
		</div>
	)
}
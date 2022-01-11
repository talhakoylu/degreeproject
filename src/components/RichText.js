import dynamic from 'next/dynamic';

const DynamicRichText = dynamic(() => import('@mantine/rte'), {
    // Disable during server side rendering
    ssr: false,

    // Render anything as fallback on server, e.g. loader or html content without editor
    loading: () => null,
});

const CustomRichText = ({...dist}) => {
    return <DynamicRichText
        sx={{
            ".ql-editor": {
                minHeight: "200px",
                maxHeight: "400px",
                overflowY: "auto",
            },

        }}
        controls={[
            ['bold', 'italic', 'underline', 'blockquote', 'clean'],
            ['unorderedList', 'h1', 'h2', 'h3', 'h4', 'h5'],
            ['link'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
        ]}
        sticky={true}
        {...dist}
    />
}

export default CustomRichText;
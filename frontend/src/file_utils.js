export function filterFilesToUpload(acceptedFiles) {
    const acceptedExtensions = ['fasta', 'a3m']
    const filteredFiles = acceptedFiles.filter(file =>
        acceptedExtensions.includes(file.name.split('.').pop())
    );
    return filteredFiles
}

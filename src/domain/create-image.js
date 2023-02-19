export default async function createImg(file) {
    this.image = await new Image();
    const reader = new FileReader();
    const vm = this;

    reader.onload = (e) => {
        vm.image = e.target.result;
    };

    reader.readAsDataURL(file);
    URL.createObjectURL(file)

    return
}

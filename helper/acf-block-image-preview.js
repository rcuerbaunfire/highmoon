document.addEventListener("mouseover", function (e) {
    // Selector to preview block where you want to show background image
    const previewContainer = document.querySelector('.block-editor-inserter__preview-content-missing');

    if (!previewContainer) {
        return;
    }

    if (e.target.closest('.block-editor-block-types-list__item')) {
        const hoveredBlock = e.target.closest('.block-editor-block-types-list__item');

        // to find a name of the block we can extract it from block classes

        // Retrieve classes from the block on which the mouse is hovered
        const blockClasses = hoveredBlock.className.split(' ');

        // Finding a class that starts with "editor-block-list-item-acf-"
        const blockClass = blockClasses.find(cls => cls.startsWith("editor-block-list-item-acf-"));

        // If such a class is found, extract the name from it
        if (blockClass) {
            const previewContainerParent = document.querySelector('.block-editor-inserter__preview-container');
            const blockName = blockClass.replace("editor-block-list-item-acf-", "");

            // Get the image URL for this block
            // const imageFile = wp.data
            const imageName = wp.data.select('core/blocks').getBlockType("acf/" + blockName)?.attributes?.previewImage?.default;
            
            const imageUrl = `${window.location.origin}/wp-content/themes/nimbl/blocks/${imageName}`;

            // adding our styles if there is a link to the picture\
            
            previewContainerParent.style.width = '';
            previewContainer.style.background = '';
            previewContainer.style.backgroundSize = '';
            previewContainer.style.fontSize = '';
            previewContainer.style.height = '';
            previewContainer.style.backgroundColor = '';

            if (imageName) {
                previewContainerParent.style.width = '400px';
                previewContainer.style.background = `url(${imageUrl}) no-repeat center`;
                previewContainer.style.backgroundSize = 'contain';
                previewContainer.style.fontSize = '0px';
                previewContainer.style.height = '300px';
                previewContainer.style.backgroundColor = '#F3F9FA';
            }
        }
    }
});
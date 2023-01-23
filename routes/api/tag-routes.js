const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: Product
  })
  res.json(tags)
  // find all tags
  // be sure to include its associated Product data
  
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findOne({
    include: Product
  })
  res.json(tagData)
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  const newTag = await Tag.create(req.body)
  //   {
  //   newTag: {
  //     id: req.body.id,
  //     tag_name: req.body.tag_name
  //   }
  // })
  res.json(newTag)
  // create a new tag
});

router.put('/:id', async (req, res) => {
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.json(updateTag)
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const tagDelete = await Tag.destroy({ where: {id: req.params.id}})
  res.json(tagDelete);
});

module.exports = router;

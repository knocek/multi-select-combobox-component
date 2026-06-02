import { Router } from 'express';

import { createItem, getItems, isCollectionName, searchItems } from '../services/items.service';

const router = Router();

router.get('/:collection', (req, res) => {
  const { collection } = req.params;
  const search = typeof req.query.search === 'string' ? req.query.search : '';

  if (!isCollectionName(collection)) {
    return res.status(404).json({
      message: `Collection "${collection}" does not exist.`,
    });
  }

  const items = search.trim() ? searchItems(collection, search) : getItems(collection);

  return res.json(items);
});

router.post('/:collection', (req, res) => {
  const { collection } = req.params;

  if (!isCollectionName(collection)) {
    return res.status(404).json({
      message: `Collection "${collection}" does not exist.`,
    });
  }

  try {
    const newItem = createItem(collection, req.body);

    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : 'Invalid request body.',
    });
  }
});

export default router;

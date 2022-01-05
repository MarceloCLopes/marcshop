import { ListItem, ListItemText } from "@material-ui/core";

export function Item({ name, details }) {
  return (
    <ListItem>
      <ListItemText primary={name} secondary={details} />
    </ListItem>
  );
}

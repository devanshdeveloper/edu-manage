import BarcodeExample from "../examples/BarcodeExample";
import { BroadcastExample } from "../examples/BroadcastExample";
import FormExample from "../examples/FormExample";
import KeyboardExample from "../examples/KeyboardExample";
import ModalExample from "../examples/ModalExample";

const ExampleRoutes = [
  {
    path: "/examples",
    children: [
      {
        path: "barcode-scanner",
        element: <BarcodeExample />,
      },
      {
        path: "broadcast",
        element: <BroadcastExample />,
      },
      {
        path: "keyboard",
        element: <KeyboardExample />,
      },
      {
        path: "form",
        element: <FormExample />,
      },
      {
        path: "modal",
        element: <ModalExample />,
      },
    ],
  },
];

export default ExampleRoutes;

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import MainHeader from "../components/MainHeader";
import Script from "next/script";
import { motion } from "framer-motion";

export default function FourOhFour() {
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: -1 }}
      className="container py-3"
    >
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></Script>

      <MainHeader />
      <div class="align-items-center justify-content-center vh-100 pt-5">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="fs-3">
            {" "}
            <span class="text-danger">Opps!</span> Page not found.
          </p>
          <p class="lead">The page you are looking for does not exist.</p>
          <Link href="/" class="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

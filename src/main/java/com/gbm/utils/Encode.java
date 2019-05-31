package com.gbm.utils;

import java.util.Base64;

public class Encode {

  private Encode() {
  }

  /**
   * Encode to Base64.
   * 
   * @param user
   * @param password
   * @return
   */
  public static Object code(String user, String password) {
    return Base64.getEncoder().encodeToString((user + ":" + password).getBytes());
  }
}